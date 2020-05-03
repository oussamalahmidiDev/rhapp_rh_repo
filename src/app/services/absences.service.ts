import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AbsencesService {

  public host = environment.BASE_URL;
  constructor(private http: HttpClient) { }

  public getAbsences(){
    return this.http.get(this.host+"/absences");
  }
}
