import { Module } from '@nestjs/common';
import { HyperbeeServerService } from '../../infrastructure/data/hyperbee-server.service';
import { HyperbeeClientService } from '../../infrastructure/data/hyperbee-client.service';

@Module({
  providers: [HyperbeeServerService, HyperbeeClientService],
  exports: [HyperbeeServerService, HyperbeeClientService],
})
export class HyperbeeModule {}
