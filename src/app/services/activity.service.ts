import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ActivityService {
  BASE_URL: string = environment.BASE_URL;

  limit = 20;

  constructor(private http: HttpClient) {}

  getActivities(limit: number = 25): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/api/activities?limit=${limit}`);
  }

  getPersonnalActivities(limit: number = 25): Observable<any> {
    return this.http.get<any>(
      `${this.BASE_URL}/api/activities/personnal?limit=${limit}`
    );
  }
}
