import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import {
  HttpClient,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Absence } from "../models/absence";

@Injectable({
  providedIn: "root",
})
export class AbsencesService {
  BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  public getAbsences(): Observable<Absence[]> {
    return this.http.get<Absence[]>(this.BASE_URL + "/api/absences");
  }

  public createAbsence(
    formData: FormData
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpResponse<Absence>
    | HttpProgressEvent
    | HttpUserEvent<Absence>
  > {
    return this.http.post<Absence>(
      `${this.BASE_URL}/api/absences/create`,
      formData,
      {
        responseType: "json",
        reportProgress: true,
        observe: "events",
      }
    );
  }

  repondre(id: number, avis: string): Observable<Absence> {
    return this.http.put<Absence>(
      `${this.BASE_URL}/api/absences/${id}/${avis}`,
      {}
    );
  }

  deleteAbsence(id: number): Observable<any> {
    return this.http.delete<any>(
      `${this.BASE_URL}/api/absences/${id}/supprimer`
    );
  }
}
