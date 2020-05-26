import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CanActivate} from '@angular/router/src/utils/preactivation';
import {UserService} from '../services/user.service';
import {TokenService} from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(private authService: UserService, private router: Router, private tokenService: TokenService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> | Promise<any> | boolean {
    if (this.tokenService.getUser()) {
      if (this.tokenService.isTokenExpired()) {
        this.router.navigateByUrl('/');
        return false;
      } else {
        return true;
      }
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }


}
