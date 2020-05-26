import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {Absence} from '../models/absence';
import {Store} from '@ngxs/store';
import {GetAbsences} from '../actions/absences.action';
import {AbsencesState} from '../states/absences.state';


@Injectable({
  providedIn: 'root'
})

export class AbsencesServiceResolver implements Resolve<Absence[]> {

  constructor(private store: Store) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Absence[]> {
    return this.store.dispatch(new GetAbsences()).pipe(
      map(() => this.store.selectSnapshot(AbsencesState))
    );
  }

}
