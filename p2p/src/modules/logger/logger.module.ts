import { Module } from "@nestjs/common";
import { LoggingService } from "./logger.service";
import { MongooseModule, getModelToken } from "@nestjs/mongoose";
import { Logs, Logschema } from "./entities/Logging.entity";
import { ConfigModule } from "@nestjs/config";
@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: "logs", schema: Logschema }]),
  ],
  providers: [
    LoggingService,
    {
      provide: getModelToken(Logs.name),
      useValue: Logschema,
    },
  ],
  exports: [LoggingService],
})
export class LoggerModule {}
