import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consumer } from './consumer';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConsumerService {
  private consumerDetails: Consumer;

  constructor(private http: HttpClient) {
    this.consumerDetails = this.getDefaultConsumer(); // Initialize with default values
  }

  // Method to provide default values for the Consumer class
  private getDefaultConsumer(): Consumer {
    return {
      id: '',
      identification_type: '',
      identification_number: '',
      name: '',
      email: '',
      contact_number: '',
      address: '',
      companies: [],
    };
  }

  getConsumerDetails(consumer: Consumer): Observable<Consumer> {
    const token = sessionStorage.getItem('user')
      ? JSON.parse(sessionStorage.getItem('user')!).token
      : null;

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    // Ensure the URL matches the backend route
    const url = `/consumer/details/${consumer.identification_type}/${consumer.identification_number}`;

    return this.http
      .get<Consumer>(url, { headers }) // Pass headers without query params
      .pipe(
        map((response: Consumer) => {
          this.consumerDetails = response;
          return response;
        }),
        catchError((error) => {
          console.error('Error fetching consumer details:', error.message);
          return throwError(() => error);
        })
      );
  }

  getActualConsumerDetails(): any {
    return this.consumerDetails;
  }
}
