import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { CongeMaladieRequest } from '../models/congeMaladieRequest';
import { Observable } from 'rxjs';
import { Conge } from '../models/conge';

@Injectable({
  providedIn: 'root'
})
export class CongesService {

  BASE_URL = environment.BASE_URL;
  constructor(private http: HttpClient) { }

  public getConges(){
    return this.http.get(this.BASE_URL + "/api/conges");
  }

  public createCongeMaladie (request: CongeMaladieRequest): Observable<Conge> {
    return this.http.post<Conge>(`${this.BASE_URL}/api/conges/create_maladie`, request);
  }
}
