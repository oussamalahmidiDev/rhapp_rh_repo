import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
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
    // console.log(this.service.getSalarie(parseInt(route.paramMap.get('id'))));
    return this.store.dispatch(new GetSalarieById(parseInt(route.paramMap.get('id'), 10))).pipe(
      map(() => this.store.selectSnapshot(SalariesState)),
      catchError(error => {
        console.log(error);
        return error;
      })
    );
    // return this.store.dispatch(new GetSalarieById(parseInt(route.paramMap.get('id')))).subscribe(
    //   map(() => this.store.selectSnapshot(SalariesState.getSelectedSalarie))
    // )
    // return this.service.getSalarie(parseInt(route.paramMap.get('id')))
    // .pipe(
    //   map (salarie => salarie),
    //   catchError(error => {
    //     console.log(error);
    //     if (error.status == 404) {
    //       alert("Ce salarié est introuvable");
    //       this.router.navigate(['/home/salaries']);
    //     }
    //     else {
    //       alert("Something went wrong...");
    //       this.router.navigate(['/home/dashboard']);
    //     }
    //     return of({ salarie: null });
    //   })
    // );
  }

}
