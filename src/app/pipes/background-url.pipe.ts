import {Pipe, PipeTransform} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Pipe({
  name: 'url'
})
export class BackgroundUrlPipe implements PipeTransform {

  BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) {

  }


  transform(path: string): string {
    return `url(${path})`;
    // const path = type == 'salarie'? `salaries/${id}/avatar` : 'profile/avatar'
    // return this.http.get(`${this.BASE_URL}/api/${path}/${photo}`, {responseType: 'blob'})
    //   .pipe(map(data => `url(${URL.createObjectURL(data)})`));
  }

}
