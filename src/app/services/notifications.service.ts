import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  BASE_URL: string = environment.BASE_URL;

  constructor(private zone: NgZone, private http: HttpClient, private tokenService: TokenService) { }

  get(): Observable<Notification[]> {
    return Observable.create(observer => {
      const eventSource = new EventSourcePolyfill(`${this.BASE_URL}/api/notifications/subscribe`, {
        headers: {
          'Authorization': 'Bearer ' + this.tokenService.getToken()
        }
      });
      eventSource.onmessage = e => {
        console.log('New notification : ', e);
        this.zone.run(() => observer.next(e))
      };
      eventSource.onerror = e => {
        console.log('Notification error: ', e);
        this.zone.run(() => observer.error(e))
      }
  
    });
    // return this.http.get<Notification>(`${this.BASE_URL}/api/notifications`, { responseType:  })
    // .pipe(tap(res => console.log('New notification : ', res)));
  }
}
