import {Injectable} from '@angular/core';
import {Poste} from '../models/poste';
import {Salarie} from '../models/salarie';
import {SalariesService} from './salaries.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Service } from '../models/service';
import { Direction } from '../models/direction';

@Injectable({
  providedIn: 'root'
})
export class PosteService {

  BASE_URL: string = environment.BASE_URL;

  salarie: Salarie = this.salariesService.getSalarie('U73540990');

  postes: Poste[] = [
   
  ];

  getPostes(): Observable<Poste[]> {
    return this.http.get<Poste[]>(`${this.BASE_URL}/api/postes`);
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.BASE_URL}/api/services`);
  }

  getDirections(): Observable<Direction[]> {
    return this.http.get<Direction[]>(`${this.BASE_URL}/api/directions`);
  }

  createPoste(poste: Poste): Observable<Poste> {
    return this.http.post<Poste>(`${this.BASE_URL}/api/postes/create`, poste);
  }

  constructor(private salariesService: SalariesService, private http: HttpClient) {

  }
}
