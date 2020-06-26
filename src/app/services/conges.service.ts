import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { CongeMaladieRequest } from "../models/congeMaladieRequest";
import { Observable } from "rxjs";
import { Conge } from "../models/conge";

@Injectable({
  providedIn: "root",
})
export class CongesService {
  BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  public getConges(): Observable<Conge[]> {
    return this.http.get<Conge[]>(this.BASE_URL + "/api/conges");
  }

  public createCongeMaladie(request: CongeMaladieRequest): Observable<Conge> {
    return this.http.post<Conge>(
      `${this.BASE_URL}/api/conges/create_maladie`,
      request
    );
  }

  public repondreConge(id: number, request: any): Observable<Conge> {
    return this.http.post<Conge>(
      `${this.BASE_URL}/api/conges/${id}/repondre`,
      request
    );
  }

  public modifierConge(id: number, request: Conge): Observable<Conge> {
    return this.http.put<Conge>(
      `${this.BASE_URL}/api/conges/${id}/modifier`,
      request
    );
  }

  public declarerRetour(id: number): Observable<Conge> {
    return this.http.put<Conge>(
      `${this.BASE_URL}/api/conges/${id}/declarer_retour`,
      {}
    );
  }

  deleteConge(id: number): Observable<any> {
    return this.http.delete<any>(`${this.BASE_URL}/api/conges/${id}/supprimer`);
  }

  getParametres(): Observable<any> {
    return this.http.get<Conge[]>(this.BASE_URL + "/api/conges/parametres");
  }

  setParametres(request: { coeffConge: number }): Observable<any> {
    return this.http.post(this.BASE_URL + "/api/conges/parametres", request);
  }
}
