import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CongesService {

  public host = environment.BASE_URL;
  constructor(private http: HttpClient) { }

  public getConges(){
    return this.http.get(this.host+"/api/conges");
  }
}
