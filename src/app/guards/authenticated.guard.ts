import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { UserService } from '../services/user.service';
import { map, catchError } from 'rxjs/operators';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  
  constructor (private authService: UserService, private router: Router, private tokenService: TokenService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> | Promise<any> | boolean {
      if (this.tokenService.getUser()) {
          if (this.tokenService.isTokenExpired()) {
            this.router.navigateByUrl('/');
            return false;
            // Should Redirect Sig-In Page
          } else {
            return true;
          }
      } else {
        this.router.navigateByUrl('/');
        return false;
      }
  }

  
}
