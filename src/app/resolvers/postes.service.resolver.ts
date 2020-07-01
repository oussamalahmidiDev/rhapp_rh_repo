import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Poste} from '../models/poste';
import {Store} from '@ngxs/store';
import {GetPostes} from '../actions/postes.action';
import {PostesState} from '../states/postes.state';


@Injectable({
  providedIn: 'root'
})

export class PosteServiceResolver implements Resolve<Poste[]> {

  constructor(private store: Store) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Poste[]> {
    return this.store.dispatch(new GetPostes()).pipe(
      map(() => this.store.selectSnapshot(PostesState))
    );
  }

}
