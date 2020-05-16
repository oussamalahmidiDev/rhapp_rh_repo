import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators'; import { empty, Observable } from 'rxjs';
import { PosteService } from '../services/poste.service';
import { Poste } from '../models/poste';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import {Salarie} from '../models/salarie';
import {SalariesService} from '../services/salaries.service';


@Injectable({
  providedIn: 'root'
})

export class SalariesServiceResolver implements Resolve<Salarie[]> {

  constructor(private service: SalariesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Salarie[]> {
    return this.service.getSalaries();
  }

}
