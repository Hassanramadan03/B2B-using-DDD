import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { FirstModule } from "./modules/first-module/first.module";
import { SharedCacheModule } from "./common/cache/cache.module";
import { ConfigModule } from "@nestjs/config";
import { MongodbModule } from "./common/db/mongodb.module";
import { LoggerModule } from "./modules/logger/logger.module";
import { GenericModule } from "./modules/generic/generic.module";
import { DHTService } from "./infrastructure/peer-networking/dht.service";
import { RPCService } from "./infrastructure/peer-networking/rpc.service";
import { DataModule } from "./infrastructure/data/data.module";
import { PeerNetworkingModule } from "./infrastructure/peer-networking/peer-networking.module";
const host = "mongodb";
const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${host}:27017/${process.env.DB_NAME}?authSource=admin&tls=true&tlsAllowInvalidHostnames=true`;
const MONGO_SSL_CA_PATH = "./certificates/db/ca.crt";
const MONGO_SSL_CERT_KEY = "./certificates/db/mongodb.pem";

@Module({
  imports: [
    ConfigModule,
    MongodbModule,
    SharedCacheModule,
    FirstModule,
    LoggerModule,
    GenericModule,
    DataModule,
    PeerNetworkingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
