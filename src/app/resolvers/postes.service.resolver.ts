import { Injectable } from '@angular/core'; 
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'; 
import { catchError } from 'rxjs/operators'; import { empty, Observable } from 'rxjs';
import { PosteService } from '../services/poste.service';
import { Poste } from '../models/poste';


@Injectable({
providedIn: 'root'
})

export class PosteServiceResolver implements Resolve<Poste[]> {

      constructor(private service: PosteService) { }

      resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Poste[]> {
            return this.service.getPostes();
      }

}