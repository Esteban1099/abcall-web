import {Component} from '@angular/core';
import {ToastService} from "../toast.service";
import {NgbToastModule} from "@ng-bootstrap/ng-bootstrap";
import {CommonModule, NgForOf} from "@angular/common";

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    NgbToastModule,
    NgForOf
  ],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  host: {
    class: 'toast-container bottom-0 end-0 p-3',
    style: 'z-index: 1200'
  }
})
export class ToastComponent {

  constructor(public utilService: ToastService) {
  }
}
