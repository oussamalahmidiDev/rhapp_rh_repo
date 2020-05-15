import { Injectable } from '@angular/core';
import {Salarie} from '../models/salarie';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

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


  constructor(private http: HttpClient) { }
}
