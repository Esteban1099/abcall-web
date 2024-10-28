import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

 backAuthLogin: EventEmitter<void> = new EventEmitter<void>();
}
