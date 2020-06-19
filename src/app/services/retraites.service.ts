import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Retraite } from "../models/retraite";

@Injectable({
  providedIn: "root",
})
export class RetraitesService {
  BASE_URL: string = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  getRetraitesType(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/api/retraites/types`);
  }

  createRetraite(retraite: Retraite): Observable<Retraite> {
    return this.http.post<Retraite>(
      `${this.BASE_URL}/api/salaries/${retraite.salarie.id}/retraite/create`,
      retraite
    );
  }

  validerRetraite(
    id: number,
    request: { remarques: string }
  ): Observable<Retraite> {
    return this.http.post<Retraite>(
      `${this.BASE_URL}/api/salaries/${id}/retraite/valider`,
      request
    );
  }
}
