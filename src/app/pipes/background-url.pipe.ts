import {Pipe, PipeTransform} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'url'
})
export class BackgroundUrlPipe implements PipeTransform {

  BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) {

  }


  transform(photo: string, type: string, id: number): any {
    const path = type == 'salarie'? `salaries/${id}/avatar` : 'profile/avatar'
    return this.http.get(`${this.BASE_URL}/api/${path}/${photo}`, {responseType: 'blob'})
      .pipe(map(data => `url(${URL.createObjectURL(data)})`));
  }

}
