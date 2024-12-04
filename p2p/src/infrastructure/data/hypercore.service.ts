import { Injectable } from "@nestjs/common";
import Hypercore from "hypercore";

@Injectable()
export class HypercoreService {
  private core: Hypercore;

  constructor() {
    this.core = new Hypercore("./data", { valueEncoding: "json" });
  }

  public async appendData(data: any): Promise<number> {
    return await this.core.append(data);
  }

  public async readData(index: number): Promise<any> {
    return await this.core.get(index);
  }
}
