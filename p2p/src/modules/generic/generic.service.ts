import { Injectable, Inject } from '@nestjs/common';
import { IDataLayer, IDataLayerToken } from '../../core/interfaces/IDataLayer';

@Injectable()
export class GenericService {
  constructor(@Inject(IDataLayerToken) private readonly dataLayer: IDataLayer) {}

  async create(key: string, value: any): Promise<any> {
    return this.dataLayer.create(key, value);
  }

  async read(key: string): Promise<any | null> {
    return this.dataLayer.read(key);
  }

  async update(key: string, value: any): Promise<any> {
    return this.dataLayer.update(key, value);
  }

  async delete(key: string): Promise<void> {
    return this.dataLayer.delete(key);
  }
}
