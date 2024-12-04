import { Injectable } from "@nestjs/common";
import * as Node from "@hyperswarm/rpc";
import { IRpcService } from "../../core/interfaces/IRpcService";

@Injectable()
export class RPCService implements IRpcService {
  private node: Node;

  constructor() {
    this.node = new Node();
  }

  async init(): Promise<void> {
    await this.node.bind();
    console.log("RPC node initialized");
  }

  registerMethod(
    name: string,
    handler: (...args: any[]) => Promise<any>
  ): void {
    this.node.register(name, handler);
  }

  async callMethod(peerKey: string, method: string, args: any[]): Promise<any> {
    return this.node.request(peerKey, method, args);
  }
}
