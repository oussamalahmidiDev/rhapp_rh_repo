import {Pipe, PipeTransform} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'url'
})
export class BackgroundUrlPipe implements PipeTransform {

  url: any;

  constructor(private http: HttpClient) {
  }


  transform(url: string): any {
    return this.http.get(url, {responseType: 'blob'})
      .pipe(map(data => `url(${URL.createObjectURL(data)})`));

  }

}
