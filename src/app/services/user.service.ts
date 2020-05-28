import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  currentUser: User;
  BASE_URL: string = environment.BASE_URL;

  constructor(private router: Router, private http: HttpClient) {
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.BASE_URL.substr(0, this.BASE_URL.length - 3)}/api/auth`, {email, password});
  }

  sendPasswordRecoveryRequest(email: string): Observable<any> {
    return this.http.post(`${this.BASE_URL.substr(0, this.BASE_URL.length - 3)}/api/forgot_password`, {email});
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/api/profile`);
  }

  modifierProfile(user: User): Observable<User> {
    return this.http.post<User>(`${this.BASE_URL}/api/profile/modifier`, user);
  }

  changePassword(request: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/api/profile/change_password`, request);
  }

  uploadAvatar(image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', image);
    return this.http.post(`${this.BASE_URL}/api/profile/avatar/upload`, formData, {
      responseType: 'json',
      reportProgress: true,
      observe: 'events'
    });
  }

  deletePhoto(): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/api/profile/avatar/delete`);
  }

}

export const AUTH_PROVIDERS: Array<any> = [
  {provide: ProfileService, useClass: ProfileService}
];
