import { Injectable, Logger } from "@nestjs/common";
import { errorParser } from "../../utils/error-util";
import * as fs from "fs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { LogsDocument } from "./entities/Logging.entity";
import * as cron from "node-cron";
import { ConfigService } from "@nestjs/config";
const ENABLE_LOGS_IN_TERMINAL = false;
const getDateByMinuteFormate = () => {
  const date = new Date();
  const minute = date.getMinutes();
  const hour = date.getHours();
  return `${hour}:${minute}`;
};

@Injectable()
export class LoggingService {
  logger: Logger = new Logger();
  logsDirectory = "logs";
  constructor(
    @InjectModel("logs") private model: Model<LogsDocument>,
    private configService: ConfigService
  ) {
    this.ensureLogsDirectoryExists();
    const retentionDays =
      parseInt(this.configService.get("RETENTION_DAYS")) || 7;
    const dateToRemove = this.getTheDateBeforeNdays(retentionDays);
    this.cleanLogs(dateToRemove);
    cron.schedule("0 6 * * *", () => this.cleanLogs(dateToRemove));
  }
   

  private ensureLogsDirectoryExists() {
    if (!fs.existsSync(this.logsDirectory)) {
      fs.mkdirSync(this.logsDirectory, { recursive: true });
      console.log(`Logs directory created at ${this.logsDirectory}`);
    }
  }
  error(corlId: string, message: string, error?: Error) {
    const errorPath = errorParser(error);
    const errorMessage = `timestamp:${Date.now()} , the message is ${message} , and the path is ${
      errorPath.filePath
    }`;
    this.appendTextToFile(
      `Errors_in_Min_${getDateByMinuteFormate()}`,
      errorMessage
    )();
    this.logger.error(error, error);
  }
  async log(corlId, message, ...args) {
    this.createLog({ corlId, payload: message });
    await this.appendTextToFile(
      `Logger_in_Min_${getDateByMinuteFormate()}`,
      `corlId ==> ${corlId}  ${message} ,${args}`
    )();
  }

  async warn(corlId, message, ...args) {
    this.createLog({ corlId, payload: message });
    await this.appendTextToFile(
      `Warner_in_Min_${getDateByMinuteFormate()}`,
      `corlId ==> ${corlId}  ${message} ,${args}`
    )();
    if (ENABLE_LOGS_IN_TERMINAL) this.logger.debug(message);
  }
  async debug(corlId, message, ...args) {
    this.createLog({ corlId, payload: message });
    await this.appendTextToFile(
      `Debuger_in_Min_${getDateByMinuteFormate()}`,
      `corlId ==> ${corlId}  ${message} ,${args}`
    )();
    if (ENABLE_LOGS_IN_TERMINAL) this.logger.debug(message);
  }
  private appendTextToFile(filename: string, text: string) {
    try {
      return async () => {
        const folderName = "logs";
        if (
          !(await fs.existsSync(`${folderName}/${this.getDatekey(new Date())}`))
        ) {
          await fs.mkdirSync(`${folderName}/${this.getDatekey(new Date())}`, {
            recursive: true,
          });
        }

        const fileName = `logs/${this.getDatekey(new Date())}/${filename}.txt`;
        const split = `----------------------------------------------------------------------------------------------------------------`;
        const textToAppend = `${text}.\n ${split} \n \n \n `;
        if (await fs.existsSync(fileName)) {
          return fs.appendFileSync(fileName, textToAppend, "utf8");
        } else {
          return fs.writeFileSync(fileName, textToAppend, "utf8");
        }
      };
    } catch (error) {
      console.log(error);
    }
  }

  private getDatekey(dateOfToday) {
    return dateOfToday.toLocaleDateString().split("/").reverse().join("_");
  }

  private getTheDateBeforeNdays = (n: number) => {
    const currentDateTime = new Date();
    const minusNDays = new Date(currentDateTime);
    minusNDays.setDate(
      currentDateTime.getDate() - currentDateTime.getDay() - n
    );
    return minusNDays;
  };
  private createLog({ corlId, payload }: any) {
    return this.model.create({
      corlId,
      payload,
      lastDetectionTime: new Date(),
    });
  }

  private cleanLogs(dateToRemove) {
    const folderName = "logs";
    const folderPath = `${folderName}`;
    try {
      fs.accessSync(folderPath, fs.constants.R_OK | fs.constants.W_OK);
      console.log("Logs directory exists and has the necessary permissions.");
    } catch (err) {
      console.error("Error accessing logs directory:", err);
      return;
    }
    console.log("Removing logs older than ", dateToRemove);
    this.model.deleteMany({ lastDetectionTime: { $lt: dateToRemove } }).exec();
    const getDirectoriesInPath = (folderPath) => fs.readdirSync(folderPath);
    const folders = getDirectoriesInPath(folderPath);
    const filter = (folder) =>
      new Date(folder.split("_").reverse().join("-")) < dateToRemove;
    const deleteFolder = (folder) => {
      try {
        const folderPathToRemove = `${folderPath}/${folder}`;
        console.log("Removing folder ", folderPathToRemove);
        fs.rmdirSync(folderPathToRemove, { recursive: true });
      } catch (err) {
        console.error("Error removing folder:", err);
      }
    };
    folders.filter(filter).forEach(deleteFolder);
  }
}
