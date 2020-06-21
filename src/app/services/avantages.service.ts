import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AvantageNature } from "../models/avatange";
import { Salarie } from "../models/salarie";

@Injectable({
  providedIn: "root",
})
export class AvantagesService {
  BASE_URL: string = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  getAvantageTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/api/avantages/types`);
  }

  createAvantage(
    id: number,
    avantage: AvantageNature
  ): Observable<AvantageNature> {
    return this.http.post<AvantageNature>(
      `${this.BASE_URL}/api/salaries/${id}/avantages/create`,
      avantage
    );
  }

  retirerAvantage(
    id: number,
    avantages: AvantageNature[]
  ): Observable<Salarie> {
    return this.http.post<Salarie>(
      `${this.BASE_URL}/api/salaries/${id}/avantages/retirer`,
      avantages
    );
  }

  supprimer(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/api/avantages/${id}/supprimer`);
  }
}
