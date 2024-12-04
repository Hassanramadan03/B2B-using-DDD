import { Module } from '@nestjs/common';
import { GenericController } from './generic.controller';
import { GenericService } from './generic.service';
import { HyperbeeService } from '../../infrastructure/data/hyperbee.service';
import { IDataLayerToken } from '../../core/interfaces/IDataLayer';

@Module({
  controllers: [GenericController],
  providers: [
    GenericService,
    {
      provide: IDataLayerToken,
      useClass: HyperbeeService, // Map the token to HyperbeeService
    },
  ],
})
export class GenericModule {}
