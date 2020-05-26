import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {TokenService} from './services/token.service';
import {Observable, of, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {CacheService} from './services/cache.service';
import {Store} from '@ngxs/store';
import {SetFetchingState} from './actions/app.action';
import {Router} from '@angular/router';


@Injectable()
export class MainHttpInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService, private cache: CacheService, private store: Store, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          //   ContentType : 'application/json; charset=utf-8',
        }
      });
    }
    const cachedResponse = this.cache.get(req);
    if (cachedResponse) {
      return of(cachedResponse);
    }

    if (req.method !== 'GET') {
      return next.handle(req);
    }

    // cache image files responses only. Other requests are cached in the state.
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        this.store.dispatch(new SetFetchingState(false));

        if (event instanceof HttpResponse && event.body instanceof Blob) {
          this.cache.put(req, event);
          // console.log('CACHE STATE', this.cache.state());
        }
        }
      ),
      catchError((error: HttpErrorResponse) => {
        this.store.dispatch(new SetFetchingState(false));
        if (error.status === 0) {
          const cachedResponse = this.cache.get(req);
          if (cachedResponse) {
            console.log('RETURNING FROM CACHE', this.cache.state());
            return of(cachedResponse);
          }
        }

        return throwError(error);
      })
    );

  }
}

