import { Injectable } from '@angular/core';
import {Salarie} from '../models/salarie';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Conge } from '../models/conge';
import { Absence } from '../models/absence';
import { encodeUriQuery } from '@angular/router/src/url_tree';

@Injectable({
  providedIn: 'root'
})
export class SalariesService {
  BASE_URL: string = environment.BASE_URL;

  salaries: Salarie[] = [  ];



  getSalarie(id: number): Observable<Salarie> {
    return this.http.get<Salarie>(`${this.BASE_URL}/api/salaries/${id}`);
  }

  getSalaries(): Observable<Salarie[]> {
    return this.http.get<Salarie[]>(`${this.BASE_URL}/api/salaries`);
  }

  createSalarie(salarie: Salarie): Observable<Salarie> {
    return this.http.post<Salarie>(`${this.BASE_URL}/api/salaries/create`, salarie);
  }

  getSalarieConges(id: number): Observable<Conge[]> {
    return this.http.get<Conge[]>(`${this.BASE_URL}/api/salaries/${id}/conges`);
  }

  getSalarieAbsences(id: number): Observable<Absence[]> {
    return this.http.get<Absence[]>(`${this.BASE_URL}/api/salaries/${id}/absences`);
  }

  searchSalaries(query: string) : Observable<Salarie[]> {
    return this.http.get<Salarie[]>(`${this.BASE_URL}/api/salaries/search?query=${query}`);
  }


  constructor(private http: HttpClient) { }
}
