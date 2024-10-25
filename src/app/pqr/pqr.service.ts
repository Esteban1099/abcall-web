import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PQR } from './pqr';

@Injectable({
  providedIn: 'root'
})
export class PccService {
  private apiUrl = 'http://your-backend-url'; // Ajusta esto con la URL real

  constructor(private http: HttpClient) {}

  createPcc(companyId: string, consumerId: string, pqr: PQR): Observable<any> {
    return this.http.post(`${this.apiUrl}/companies/${companyId}/consumers/${consumerId}/pccs`, pqr);
  }
}
