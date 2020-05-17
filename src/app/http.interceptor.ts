import { Injectable, Inject, Optional } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { TokenService } from './services/token.service';
import { Observable } from 'rxjs';

@Injectable()
export class MainHttpInterceptor implements HttpInterceptor {
 
  constructor( private tokenService: TokenService) { }
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();
    if (token)
      req = req.clone({
            setHeaders: {
            Authorization : `Bearer ${token}`,
            //   ContentType : 'application/json; charset=utf-8',
            }
      });
    return next.handle(req);
  }
}

