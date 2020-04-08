import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { UserService } from '../services/user.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  
  constructor (private authService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    // let isLoggedIn = false;
    // this.authService.getCurrentUser()
    // .pipe(
    //   map(res => console.log("CAN ACT", res)),
    //   catchError(error => this.router.navigate(['']))
    // )
    // console.log('AUTH canActivate', isLoggedIn);
    // return isLoggedIn;
    return this.authService.getCurrentUser()
    .pipe(map(loggedIn => {
      if (!loggedIn || loggedIn == undefined) {
        console.log(loggedIn, "NAVIGATING /");
        this.router.navigate(['']);
        return false;
      }
      return true;
    }))
    // const isLoggedIn = this.authService.isLoggedIn;
    //   if (!isLoggedIn) {
    //     this.router.navigate(['']);
    //   } 
    // console.log('AUTH canActivate', isLoggedIn);
    // return isLoggedIn;
  }
}
