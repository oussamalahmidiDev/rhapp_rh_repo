import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User;
  BASE_URL: string = environment.BASE_URL;
  isLoggedIn: BehaviorSubject<boolean>;

  constructor(private router: Router, private http: HttpClient) {
    // this.setCurrentUser();
    // this.getCurrentUser();
    // this.currentUser = new User("Lahmidi Oussama", "https://picsum.photos/300", "ou@g.c", "0634349912", "Nº 153 Quartier Lorem Ipsum", "23/02/1998");
  }

  // options = new RequestOptions({ withCredentials: true });

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.BASE_URL.substr(0, this.BASE_URL.length - 3)}/api/auth`, {email: email, password: password});
    // .pipe(map(res => res));
  }

  sendPasswordRecoveryRequest(email: string): Observable<any> {
    return this.http.post(`${this.BASE_URL.substr(0, this.BASE_URL.length - 3)}/api/forgot_password`, {email: email});
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

  logout(): any {
    localStorage.removeItem('userid');
    this.router.navigate(['']);
  }


  // getCurrentUser(): Observable<User> {
  //   return this.http
  //   .get<User>(`${this.BASE_URL}/api/me`,  { withCredentials: true })
  //   .pipe(
  //     map(
  //       res => {
  //         // this.isLoggedIn = new BehaviorSubject<boolean>(undefined);
  //         // // if(!this.isLoggedIn)
  //         // //   return;
  //         // this.isLoggedIn.next(true);
  //         this.currentUser = res;
  //         console.log(res);
  //         return res;
  //       }
  //     )
  //   );
  // }

  setCurrentUser(): void {
    this.getCurrentUser().subscribe(
      data => {
        console.log('SETTING CURRENT USR', data);
        this.currentUser = data;
        // this.isLoggedIn = true;
      },
      error => console.log('ERROR LOGGING IN', error.error)
    );
  }

  // authStatus() {

  // }

  // async isLoggedIn(): boolean {
  //   await this.setCurrentUser();
  //   if (this.currentUser !== undefined)
  //     console.log("YOUR LOGGED IN");
  //   return this.currentUser !== undefined;
  // }
}

export const AUTH_PROVIDERS: Array<any> = [
  {provide: UserService, useClass: UserService}
];
