import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  constructor (private authService: UserService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //   const isLoggedIn = this.authService.isLoggedIn;
    //   if (isLoggedIn) {
    //     this.router.navigate(['home']);
    //   } 
    // console.log('GUEST canActivate', isLoggedIn);
    // return true;
    return this.authService.getCurrentUser()
    .pipe(map(loggedIn => {
      if (loggedIn == undefined)
        return true;
      if (loggedIn) {
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    }))
  }
  
}
