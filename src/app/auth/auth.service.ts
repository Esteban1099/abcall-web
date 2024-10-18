import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user: User): Observable<string> {
    const headers = { 'Content-Type': 'application/json' };
    if (user.role === 'CLIENT') {
      return this.http
        .post<string>('/auth/clients/token', user, { headers })
        .pipe(
          map((response: any) => {
            const token = response.token;
            return token;
          })
        );
    } else if (user.role === 'AGENT') {
      return this.http
        .post<string>('/auth/agents/token', user, { headers })
        .pipe(
          map((response: any) => {
            const token = response.token;
            return token;
          })
        );
    } else {
      const error = new Error('El role ingresado no existe en el sistema');
      error.name = 'RoleError';
      return throwError(() => error);
    }
  }
}
