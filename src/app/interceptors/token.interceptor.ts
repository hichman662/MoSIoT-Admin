import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token!:any;

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.token = sessionStorage.getItem('token');
    if(this.token != "" && this.token != undefined){
      console.log("Añadiendo token a la llamada: ", this.token);
      const authorizationReq = request.clone({
        headers: request.headers.set('Authorization', '' + this.token)});
    
      return next.handle(authorizationReq);
    }
    else{
      return next.handle(request);
    }
  }
}
