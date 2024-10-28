import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from './user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private static getResourcePath(userType: string): string {
    return `/api/auth/${userType}/token`
  }

  constructor(private httpClient: HttpClient) {
  }

  loginClient(user: User): Observable<any> {
    return this.httpClient.post<any>(AuthService.getResourcePath('clients'), user)
  }

  loginAgent(user: User): Observable<any> {
    return this.httpClient.post<any>(AuthService.getResourcePath('agents'), user)
  }
}
