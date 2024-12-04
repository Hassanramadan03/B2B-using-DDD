import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as fs from "fs";
import helmet from "helmet";
import { json } from "express";
import * as csurf from "csurf";
import { getHttpsOptions } from "./app.helper";
process.env.NODE_ENV = "production";
async function bootstrap() {
  const appOptions = {
    cors: true,
  };
  if (process.env.NODE_ENV === "production") {
    appOptions["httpsOptions"] = getHttpsOptions();
  }
  const app = await NestFactory.create(AppModule, appOptions);
  app.enableCors();
  app.use(json({ limit: "50000mb" }));
  app.use(helmet());
  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);
  console.log(`Application is  running on: ${await app.getUrl()} `);
}
bootstrap();
