import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {Store} from '@ngxs/store';
import {GetProfile} from '../actions/profile.action';
import {ProfileState} from '../states/profile.state';


@Injectable({
  providedIn: 'root'
})

export class ProfileServiceResolver implements Resolve<User> {

  constructor(private store: Store) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.store.dispatch(new GetProfile()).pipe(
      map(() => this.store.selectSnapshot(ProfileState))
    );
  }

}
