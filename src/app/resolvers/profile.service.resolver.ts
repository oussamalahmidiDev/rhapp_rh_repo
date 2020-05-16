import { Injectable } from '@angular/core'; 
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'; 
import { catchError } from 'rxjs/operators'; import { empty, Observable } from 'rxjs';
import { PosteService } from '../services/poste.service';
import { Poste } from '../models/poste';
import { User } from '../models/user';
import { UserService } from '../services/user.service';


@Injectable({
providedIn: 'root'
})

export class ProfileServiceResolver implements Resolve<User> {

      constructor(private service: UserService) { }

      resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
            return this.service.getCurrentUser();
      }

}