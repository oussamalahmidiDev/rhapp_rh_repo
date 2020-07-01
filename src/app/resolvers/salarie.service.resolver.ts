import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Salarie} from '../models/salarie';
import {SalariesService} from '../services/salaries.service';
import {Store} from '@ngxs/store';
import {GetSalarieById} from '../actions/salaries.action';
import {SalariesState} from '../states/salaries.state';


@Injectable({
  providedIn: 'root'
})

export class SalarieServiceResolver implements Resolve<Salarie> {

  constructor(private service: SalariesService, private router: Router, private store: Store) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store.dispatch(new GetSalarieById(parseInt(route.paramMap.get('id'), 10))).pipe(
      map(() => this.store.selectSnapshot(SalariesState)),
      catchError(error => {
        if (error.status === 404) {
          console.log('NOT FOUND');
          this.router.navigateByUrl('/error');
        }
        return of(error);
      })
    );
  }

}
