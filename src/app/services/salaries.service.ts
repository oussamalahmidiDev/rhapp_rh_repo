import { Injectable } from "@angular/core";
import { Salarie } from "../models/salarie";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Conge } from "../models/conge";
import { Absence } from "../models/absence";
import { DownloadService } from "./download.service";

@Injectable({
  providedIn: "root",
})
export class SalariesService {
  BASE_URL: string = environment.BASE_URL;

  salaries: Salarie[] = [];

  emitChange$: Subject<Salarie> = new BehaviorSubject<Salarie>(null);

  constructor(
    private http: HttpClient,
    private downloadService: DownloadService
  ) {}

  get emitChange(): BehaviorSubject<Salarie> {
    return this.emitChange$ as BehaviorSubject<Salarie>;
  }

  emit(salarie: Salarie) {
    this.emitChange$.next(salarie);
  }

  getSalarie(id: number): Observable<Salarie> {
    return this.http.get<Salarie>(`${this.BASE_URL}/api/salaries/${id}`);
  }

  getSalaries(): Observable<Salarie[]> {
    return this.http.get<Salarie[]>(`${this.BASE_URL}/api/salaries`);
  }

  createSalarie(salarie: Salarie): Observable<Salarie> {
    return this.http.post<Salarie>(
      `${this.BASE_URL}/api/salaries/create`,
      salarie
    );
  }

  getSalarieConges(id: number): Observable<Conge[]> {
    return this.http.get<Conge[]>(`${this.BASE_URL}/api/salaries/${id}/conges`);
  }

  getSalarieAbsences(id: number): Observable<Absence[]> {
    return this.http.get<Absence[]>(
      `${this.BASE_URL}/api/salaries/${id}/absences`
    );
  }

  searchSalaries(criteria: string): Observable<Salarie[]> {
    let query = `user.nom:${criteria}* 
    OR user.prenom:${criteria}*
    OR fonction:${criteria}*
    OR numSomme:${criteria}*
    OR service.nom:${criteria}*
    OR direction.nom:${criteria}*`;

    return this.http.get<Salarie[]>(
      `${this.BASE_URL}/api/salaries/search?search=${query}`
    );
  }

  deleteSalarie(id: number, body: any): Observable<any> {
    return this.http.request<any>(
      "DELETE",
      `${this.BASE_URL}/api/salaries/${id}/supprimer`,
      { body }
    );
  }

  modifierSalarie(id: number, salarie: Salarie): Observable<Salarie> {
    return this.http.put<Salarie>(
      `${this.BASE_URL}/api/salaries/${id}/modifier`,
      salarie
    );
  }

  telechargerCV(id: number, filename: string) {
    return this.downloadService.handleDownload(
      `${this.BASE_URL}/api/salaries/${id}/cv/${filename}`
    );
  }
}
