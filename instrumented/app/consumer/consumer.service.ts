import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Consumer} from './consumer';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConsumerService {

  constructor(private http: HttpClient) {
  }

  getConsumer(consumer: Consumer): Observable<Consumer> {
    return this.http
      .get<Consumer>(`/api/consumers/identification_type/${consumer.identification_type}/identification_number/${consumer.identification_number}`);
  }
}
