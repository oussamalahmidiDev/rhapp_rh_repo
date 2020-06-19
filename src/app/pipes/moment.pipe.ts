import { Pipe, PipeTransform } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { Store } from "@ngxs/store";
import * as moment from "moment";

@Pipe({
  name: "moment",
})
export class MomentPipe implements PipeTransform {
  constructor() {}

  transform(date: Date): string {
    return moment().locale("fr").from(date);
  }
}
