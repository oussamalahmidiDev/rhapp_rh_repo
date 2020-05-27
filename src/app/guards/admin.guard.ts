import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';
import {ProfileState} from '../states/profile.state';
import {User} from '../models/user';
import {GetProfile} from '../actions/profile.action';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  profile: User;

  constructor(private store: Store, private router: Router) {
  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> | Promise<any> | boolean {
    return this.store.dispatch(new GetProfile()).pipe(
      map(() => {
        this.profile = this.store.selectSnapshot(ProfileState.getProfile);
        console.log('CURRENT ROLE :', this.profile);
        if (this.profile.role === 'ADMIN') {
          return true;
        }
        // window.location.replace('/');
        this.router.navigateByUrl('/');
        // this.router.navigate(['/home/dashboard']).then(() => this.router.navigate(['/home/dashboard'])).catch(err => console.log(err));
        return false;
      })
    );

    // return false;

  }


}
