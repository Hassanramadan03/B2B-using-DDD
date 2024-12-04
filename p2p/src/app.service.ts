import { Inject, Injectable, LoggerService } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { LoggingService } from "./modules/logger/logger.service";
import { CacheService } from "./common/cache/cache.service";

@Injectable()
export class AppService {
  constructor(
    private logger: LoggingService,
    private cachingService: CacheService,
    private configService: ConfigService
  ) {
  }
  async checkHealth() {
    return {
      instanceName: process.env.INSTACNE || this.configService.get("INSTANCE"),
      status: "ok",
      message: "P2P API is running",
      version: "1.0.1",
    };
  }
}
