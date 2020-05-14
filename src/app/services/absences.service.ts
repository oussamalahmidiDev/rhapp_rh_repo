import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Absence } from '../models/absence';

@Injectable({
  providedIn: 'root'
})
export class AbsencesService {

  BASE_URL = environment.BASE_URL;
  constructor(private http: HttpClient) { }

  public getAbsences(){
    return this.http.get(this.BASE_URL + "/api/absences");
  }

  public createAbsence(formData: FormData): Observable<Absence> {
    return this.http.post<Absence>(`${this.BASE_URL}/api/absences/create`, formData);
  }
}
