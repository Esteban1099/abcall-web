import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Auth} from './auth';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  loginClient(user: Auth): Observable<any> {
    return this.httpClient.post<any>("/api/auth/clients/token", user)
  }

  loginAgent(user: Auth): Observable<any> {
    return this.httpClient.post<any>("/api/auth/agents/token", user)
  }

  isAuthenticatedUser(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserRole(): string | null {
    return sessionStorage.getItem('role');
  }
}
