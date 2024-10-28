import {Injectable} from '@angular/core';
import {ToastService} from "../toast.service";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private toastService: ToastService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.toastService.showError(`${error.error.error_code}: ${error.error.error_message}`);
        return throwError(() => new Error(error.message));
      })
    );
  }
}
