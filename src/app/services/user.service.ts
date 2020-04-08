import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User;
  constructor(private router: Router, private http: HttpClient) {
    this.setCurrentUser();
    // this.getCurrentUser();
    // this.currentUser = new User("Lahmidi Oussama", "https://picsum.photos/300", "ou@g.c", "0634349912", "Nº 153 Quartier Lorem Ipsum", "23/02/1998");
  }

  BASE_URL: string = "http://localhost:8080";
  isLoggedIn: BehaviorSubject<boolean>;
  // options = new RequestOptions({ withCredentials: true });



  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}/api/login`, { username: email, password: password }, { withCredentials: true })
    .pipe(map(res => res));
  }

  logout(): any { 
    localStorage.removeItem('userid');
    this.router.navigate(['']);
  }

  getCurrentUser(): Observable<User> {
    return this.http
    .get<User>(`${this.BASE_URL}/api/me`,  { withCredentials: true })
    .pipe(
      map(
        res => {
          // this.isLoggedIn = new BehaviorSubject<boolean>(undefined);
          // // if(!this.isLoggedIn)
          // //   return;
          // this.isLoggedIn.next(true);
          this.currentUser = res;
          console.log(res);
          return res;
        }
      )
    );
  }

  setCurrentUser(): void {
    this.getCurrentUser().subscribe(
      data => {
        console.log("SETTING CRRENT USR", data);
        this.currentUser = data;
        // this.isLoggedIn = true;
      }
    )
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
export const AUTH_PROVIDERS:Array<any>=[
  { provide: UserService, useClass: UserService }
  ];
