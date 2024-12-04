export interface IRpcService {
  registerMethod(name: string, handler: (...args: any[]) => Promise<any>): void;
  callMethod(peerKey: string, method: string, args: any[]): Promise<any>;
}
