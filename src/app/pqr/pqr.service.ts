import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { PQR } from './pqr';

@Injectable({
  providedIn: 'root'
})
export class PQRService {

  constructor(private http: HttpClient) {}

  createPQR(companyId: string, consumerId: string, pqr: PQR): Observable<any> {

    const token = sessionStorage.getItem('user')
      ? JSON.parse(sessionStorage.getItem('user')!).token
      : null;

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    const url = `/companies/${companyId}/consumers/${consumerId}/pccs`;


    return this.http.post(url, JSON.stringify(pqr), { headers }).pipe(map((response: any) => {
      // Validar si la respuesta está vacía o tiene un formato inesperado
      if (!response || Object.keys(response).length === 0) {
        throw new Error('Respuesta vacía: no se pudo crear el PQR.');
      }
      return response;
    }),
    catchError((error) => {
      console.error('Error creando PQR:', error.message);
      console.log('Error creando PQR:', error.message);
      return throwError(() => new Error('Error en la creación del PQR'));
      })
    );
  }
}


