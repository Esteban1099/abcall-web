import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consumer } from '../consumer/consumer';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {


  private static getResourcePath(consumerId: string = '', id: string = '' ): string {
    return `${environment.baseUrl}/api/owners/${consumerId}/consumers/${id}`;
  }

  constructor(private http: HttpClient) {}

  getConsumer(tipoIdentificacion: string, numeroIdentificacion: string): Observable<Consumer> {
    // Asignamos los valores de tipoIdentificacion y numeroIdentificacion
    // a consumerId e id respectivamente
    const consumerId = tipoIdentificacion;
    const id = numeroIdentificacion;

    const url = ConsumerService.getResourcePath(consumerId, id);

    return this.http.get<Consumer>(url);
  }
}
