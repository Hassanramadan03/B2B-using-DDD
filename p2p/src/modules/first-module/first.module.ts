import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FirstSchema } from "./entities/first.schema";
import { SharedModule } from "../shared/shared.module";
import { FirstService } from "./first.service";
import { HandleOnCreateFirstUseCase } from "./use-cases/handle-on-create-first.use-case";
import { HandleOnUpdateFirstUseCase } from "./use-cases/handle-on-update-first.use-case";
import { LoggerModule } from "../logger/logger.module";
@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([{ name: "First", schema: FirstSchema }]),
    LoggerModule,
  ],
  providers: [
    FirstService,
    HandleOnCreateFirstUseCase,
    HandleOnUpdateFirstUseCase,
  ],
  exports: [FirstService],
})
export class FirstModule {}
