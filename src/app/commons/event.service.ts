import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  backAuthLogin: EventEmitter<void> = new EventEmitter<void>();
  showMenu: EventEmitter<void> = new EventEmitter<void>();
  clearConsumer: EventEmitter<void> = new EventEmitter<void>();
  showBackAuthLogin: EventEmitter<void> = new EventEmitter<void>();

}
