import { Injectable, NgZone } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { tap } from "rxjs/operators";
import { NativeEventSource, EventSourcePolyfill } from "event-source-polyfill";
import { TokenService } from "./token.service";
import { Notification } from "../models/notification";
@Injectable({
  providedIn: "root",
})
export class NotificationsService {
  BASE_URL: string = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  get(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.BASE_URL}/api/notifications`);
  }

  markAsSeen() {
    return this.http.post(`${this.BASE_URL}/api/notifications/mark_seen`, {});
  }
}
