import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Conge} from '../models/conge';
import {Store} from '@ngxs/store';
import {GetConges} from '../actions/conges.action';
import {CongesState} from '../states/conges.state';


@Injectable({
  providedIn: 'root'
})

export class CongesServiceResolver implements Resolve<Conge[]> {

  constructor(private store: Store) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Conge[]> {
    return this.store.dispatch(new GetConges()).pipe(
      map(() => this.store.selectSnapshot(CongesState))
    );
  }

}
