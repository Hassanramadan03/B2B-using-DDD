import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

const mongodbFactory = async (configService: ConfigService) => {
  const db_host = configService.get("DB_HOST");
  const db_user = configService.get("DB_USER");
  const db_pass = configService.get("DB_PASS");
  const db_name = configService.get("DB_NAME");
  const db_port = configService.get("DB_PORT");
  const db_auth_option = `authSource=admin&tls=true&tlsAllowInvalidHostnames=true`;
  const uri = `mongodb://${db_user}:${db_pass}@${db_host}:${db_port}/${db_name}?${db_auth_option}`;
  const MONGO_SSL_CA_PATH = "./certificates/db/ca.crt";
  const MONGO_SSL_CERT_KEY = "./certificates/db/mongodb.pem";
  console.log("uri", uri);
  return {
    uri,
    tlsCAFile: MONGO_SSL_CA_PATH,
    tlsCertificateKeyFile: MONGO_SSL_CERT_KEY,
  };
};
@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: mongodbFactory,
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class MongodbModule {}
