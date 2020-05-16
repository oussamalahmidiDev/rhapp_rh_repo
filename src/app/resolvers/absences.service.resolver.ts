import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators'; import { empty, Observable } from 'rxjs';
import { PosteService } from '../services/poste.service';
import { Poste } from '../models/poste';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import {Absence} from '../models/absence';
import {AbsencesService} from '../services/absences.service';


@Injectable({
  providedIn: 'root'
})

export class AbsencesServiceResolver implements Resolve<Absence[]> {

  constructor(private service: AbsencesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Absence[]> {
    return this.service.getAbsences();
  }

}
