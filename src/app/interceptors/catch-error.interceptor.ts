import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';

@Injectable()
export class CatchErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log("Error message: " + error.message + ". Error status: " +  error.status);
    let errorMessage = "(" + error.status + ") --> ";

    switch(error.status){
      case 204:
        errorMessage += "NoContent";
        break;
      case 400:
        errorMessage += "BadRequest";
        break;
      case 401:
        errorMessage += "Unauthorized";
        break;
      case 403:
        errorMessage += "Forbidden";
        break;
      case 404:
        errorMessage += "Not found";
        break;
      case 500:
        errorMessage += "Internal server error";
        break;
      default:
        errorMessage += "Fatal error";
        break;
    }

    return throwError(() => new Error(errorMessage));
  }
}
