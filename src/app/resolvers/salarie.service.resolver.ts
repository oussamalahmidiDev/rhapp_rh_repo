import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators'; import { empty, Observable, of } from 'rxjs';
import { PosteService } from '../services/poste.service';
import { Poste } from '../models/poste';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import {Salarie} from '../models/salarie';
import {SalariesService} from '../services/salaries.service';


@Injectable({
  providedIn: 'root'
})

export class SalarieServiceResolver implements Resolve<Salarie> {

  constructor(private service: SalariesService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    console.log(this.service.getSalarie(parseInt(route.paramMap.get('id'))));
    return this.service.getSalarie(parseInt(route.paramMap.get('id')))
    .pipe(
      map (salarie => salarie),
      catchError(error => {
        console.log(error);
        if (error.status == 404) {
          alert("Ce salarié est introuvable");
          this.router.navigate(['/home/salaries']);
        }
        else {
          alert("Something went wrong...");
          this.router.navigate(['/home/dashboard']);
        }
        return of({ salarie: null });
      })
    );
  }

}
