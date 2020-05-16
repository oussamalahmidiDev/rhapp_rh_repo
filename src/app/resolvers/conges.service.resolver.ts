import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators'; import { empty, Observable } from 'rxjs';
import { PosteService } from '../services/poste.service';
import { Poste } from '../models/poste';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import {Conge} from '../models/conge';
import {CongesService} from '../services/conges.service';


@Injectable({
  providedIn: 'root'
})

export class CongesServiceResolver implements Resolve<Conge[]> {

  constructor(private service: CongesService) { }

  resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Conge[]> {
    return this.service.getConges();
  }

}
