import {Pipe, PipeTransform} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';

@Pipe({
  name: 'blob'
})
export class BlobPipe implements PipeTransform {

  BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient, private store: Store) {

  }

  transform(photo: string, type?: string, id?: number): Observable<string> {
    const path = type === 'salarie' ? `salaries/${id}/avatar` : 'profile/avatar';
    return this.http.get(`${this.BASE_URL}/api/${path}/${photo}`, {responseType: 'blob'})
      .pipe(map(data => {
        // if (type === 'salarie') {
        //       this.store.dispatch(new LoadSalariePhoto(id, URL.createObjectURL(data)));
        // }
        return URL.createObjectURL(data);
      }));
  }

}
