import { Injectable } from "@nestjs/common";
import { Subject } from "rxjs";
import { FirstDTO } from "../first-module/dtos";

@Injectable()
export class SharedService {
  public destroy$ = new Subject<void>();
  public onCreateFirst$: Subject<FirstDTO> = new Subject<FirstDTO>();
  public onUpdateFirst$: Subject<FirstDTO> = new Subject<FirstDTO>();
  public onDeleteFirst$: Subject<any> = new Subject<any>();

  constructor() {}
  getDateKeyId(date: Date): string {
    const year = date?.getFullYear();
    const month = date?.getMonth() + 1;
    const day = date?.getDate();
    return `${year}-${month}-${day}`;
  }
}
