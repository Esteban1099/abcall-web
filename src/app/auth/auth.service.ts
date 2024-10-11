import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { User } from './user';
import { Observable, map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  login(user: User): Observable<string> {
    if (user.role === 'empresa') {
      return this.http.post<User>(`${this.apiUrl}/login/empresa`, user).pipe(
        map((response: any) => {
          const token = response.token;
          return token;
        })
      );
    } else if (user.role === 'asesor') {
      return this.http.post<User>(`${this.apiUrl}/login/asesor`, user).pipe(
        map((response: any) => {
          const token = response.token;
          return token;
        })
      );
    } else {
      return throwError(
        () => new Error('El role ingresado no existe en el sistema')
      );
    }
  }
}
