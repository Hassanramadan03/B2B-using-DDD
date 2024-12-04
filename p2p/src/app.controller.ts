import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { HttpCacheInterceptor } from "./common/interceptors/http-cache.interceptor";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  // @UseInterceptors(HttpCacheInterceptor)
  @HttpCode(HttpStatus.OK)
  async checkHealth() {
    return this.appService.checkHealth();
  }
}
