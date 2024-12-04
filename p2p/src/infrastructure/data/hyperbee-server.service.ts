import { Injectable } from "@nestjs/common";
import * as Hyperbee from "hyperbee";
import * as Hypercore from "hypercore";

@Injectable()
export class HyperbeeServerService {
  private db: Hyperbee;
  public publicKey: string;

  constructor() {
    const core = new Hypercore("./data-server"); // Ensure a valid storage directory
    this.db = new Hyperbee(core, {
      keyEncoding: "utf-8",
      valueEncoding: "json",
    });

    // Log the public key after the Hypercore instance is ready
    core.ready(() => {
      this.publicKey = core.key.toString("hex"); // Convert Buffer to hex string
      console.log("Public Key:", this.publicKey);
    });
    core.on('error', (err) => {
      console.error('Hypercore Error:', err);
    });
  }

  async createData(key: string, value: any): Promise<any> {
    await this.db.put(key, value);
    return { key, value };
  }
}
