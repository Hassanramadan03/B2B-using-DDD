import { Injectable } from "@nestjs/common";
import * as Hyperbee from "hyperbee";
import * as Hypercore from "hypercore";
import { IDataLayer } from "../../core/interfaces/IDataLayer";
import { tmpdir } from 'os';
import { join } from 'path';

const dataDir = join(tmpdir(), `hypercore-instance-${process.pid}`);
const core = new Hypercore(dataDir);

@Injectable()
export class HyperbeeService implements IDataLayer {
  private db: Hyperbee;

  constructor() {
    this.db = new Hyperbee(core, {
      keyEncoding: "utf-8",
      valueEncoding: "json",
    });
  }

  async create(key: string, value: any): Promise<any> {
    await this.db.put(key, value);
    return { key, value };
  }

  async read(key: string): Promise<any | null> {
    const result = await this.db.get(key);
    return result ? result.value : null;
  }

  async update(key: string, value: any): Promise<any> {
    await this.db.put(key, value);
    return { key, value };
  }

  async delete(key: string): Promise<void> {
    await this.db.del(key);
  }
}
