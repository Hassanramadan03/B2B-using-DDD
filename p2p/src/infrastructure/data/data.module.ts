import { Module } from "@nestjs/common";
import { HyperbeeServerService } from "./hyperbee-server.service";
import { HyperbeeClientService } from "./hyperbee-client.service";

@Module({
  providers: [HyperbeeServerService, HyperbeeClientService],
  exports: [HyperbeeServerService, HyperbeeClientService], // Export for other modules
})
export class DataModule {}
