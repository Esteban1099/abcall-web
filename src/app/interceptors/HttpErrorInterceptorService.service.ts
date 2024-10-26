import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpErrorInterceptorService {
  constructor(private toastrService: ToastrService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        let errorMessage = '';
        let errorType = '';

        // Client-side error (network issue, etc.)
        if (httpErrorResponse.error instanceof ErrorEvent) {
          errorType = 'Client-side error';
          errorMessage = httpErrorResponse.error.message;
        } else {
          // Server-side error
          errorType = 'Server-side error';

          // Handling server connection issues
          if (httpErrorResponse.status === 0) {
            errorMessage = 'No hay conexión con el servidor';
          } else {
            // Handle specific server responses
            errorMessage = `${httpErrorResponse.status}: ${httpErrorResponse.message}`;

            // Check if it's an authentication error (token-related)
            if (
              httpErrorResponse.url &&
              httpErrorResponse.url.includes('/token')
            ) {
              errorType = 'Error en la autenticación';
              console.log(httpErrorResponse);
              errorMessage = 'Credenciales inválidas';
            }

            // Check if it's an consumer error
            if (
              httpErrorResponse.url &&
              httpErrorResponse.url.includes('/consumer/details')
            ) {
              errorType = 'Error en la consulta de consumidor';
              console.log(httpErrorResponse);
              if (httpErrorResponse.message.includes('404 NOT FOUND')) {
                errorMessage =
                  'No se encontro un consumidor con los datos ingresados';
              }
            }
          }

          // Only show Toastr error for non-200 statuses
          if (httpErrorResponse.status !== 200) {
            this.toastrService.error(errorMessage, errorType, {
              closeButton: true,
            });
          }
        }

        // Throw the error
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
