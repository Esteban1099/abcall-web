import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpRequestInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers: HttpRequest<any> = request.clone({
      headers: request.headers
        .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    });
    return next.handle(headers);
  }

}
