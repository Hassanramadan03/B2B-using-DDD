export const IDataLayerToken = Symbol('IDataLayer'); // Token for dependency injection

export interface IDataLayer {
  create(key: string, value: any): Promise<any>;
  read(key: string): Promise<any | null>;
  update(key: string, value: any): Promise<any>;
  delete(key: string): Promise<void>;
}
