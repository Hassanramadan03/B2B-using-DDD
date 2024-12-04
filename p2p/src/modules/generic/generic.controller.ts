import { Controller, Post, Get, Delete, Body, Param } from "@nestjs/common";
import { GenericService } from "./generic.service";

@Controller("generic")
export class GenericController {
  constructor(private readonly genericService: GenericService) {}

  @Post()
  async create(@Body() body: { key: string; value: any }) {
    return this.genericService.create(body.key, body.value);
  }

  @Get(":key")
  async read(@Param("key") key: string) {
    return this.genericService.read(key);
  }

  @Post(":key")
  async update(@Param("key") key: string, @Body() body: any) {
    return this.genericService.update(key, body);
  }

  @Delete(":key")
  async delete(@Param("key") key: string) {
    return this.genericService.delete(key);
  }
}
