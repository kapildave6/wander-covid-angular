import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class HttpInterceptorBasicAuthService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method != "OPTIONS") {
      if (sessionStorage.getItem('token')) {
        let authHeader = 'Bearer ' + sessionStorage.getItem('token');

        req = req.clone({
          setHeaders: {
            'Authorization': authHeader
          }
        });
      }
    }
    return next.handle(req);
  }
}
