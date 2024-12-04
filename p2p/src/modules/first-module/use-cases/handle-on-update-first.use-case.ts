import { Injectable } from "@nestjs/common";
import { FirstDTO } from "../dtos";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FirstDocument } from "../entities/first.schema";

@Injectable()
export class HandleOnUpdateFirstUseCase {
  constructor(
    @InjectModel("First")
    private model: Model<FirstDocument>
  ) {}

  async execute(first: FirstDTO) {
    return this.model.updateOne({ _id: first["_id"] }, { ...first });
  }
}
