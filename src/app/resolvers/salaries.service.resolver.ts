import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Salarie} from '../models/salarie';
import {Store} from '@ngxs/store';
import {GetSalaries} from '../actions/salaries.action';
import {SalariesState} from '../states/salaries.state';


@Injectable({
  providedIn: 'root'
})

export class SalariesServiceResolver implements Resolve<Salarie[]> {

  constructor(private store: Store) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Salarie[]> {
    return this.store.dispatch(new GetSalaries()).pipe(
      map(() => this.store.selectSnapshot(SalariesState))
    );
  }

}
