import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  login(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}
