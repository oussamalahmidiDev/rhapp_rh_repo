import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../services/user.service';
import {TokenService} from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  constructor(private authService: UserService, private router: Router, private tokenService: TokenService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> | Promise<any> | boolean {
    if (this.tokenService.getUser()) {
      if (this.tokenService.isTokenExpired()) {
        return true;
      }
      this.router.navigateByUrl('/home/dashboard');
      return false;
    } else {
      return true;
    }
  }

}
