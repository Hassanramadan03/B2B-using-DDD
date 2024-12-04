import { Module } from '@nestjs/common';
import { DHTService } from './dht.service';
import { RPCService } from './rpc.service';

@Module({
  providers: [DHTService, RPCService],
  exports: [DHTService, RPCService], // Export for other modules
})
export class PeerNetworkingModule {}
