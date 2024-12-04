import { Injectable } from "@nestjs/common";
import * as DHT from "hyperdht";
import * as Hypercore from "hypercore";
import * as Hyperbee from "hyperbee";

@Injectable()
export class HyperbeeClientService {
  private db: Hyperbee;

  constructor() {
    // Paste the public key from the server logs here
    const serverKey = "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
    const core = new Hypercore('./data-client', serverKey);

    this.db = new Hyperbee(core, { keyEncoding: 'utf-8', valueEncoding: 'json' });

    core.ready(() => {
      console.log('Connected to server with key:', serverKey);
    });

    core.on('sync', () => {
      console.log('Data synchronized with the server.');
    });
  }

  async getData(key: string): Promise<any | null> {
    const result = await this.db.get(key);
    return result ? result.value : null;
  }
}
