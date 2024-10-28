import {Component, Input, OnInit} from '@angular/core';
import {Consumer} from '../../consumer/consumer';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Pcc} from '../pcc';
import {NgForOf, NgIf} from '@angular/common';
import {PccService} from '../pcc.service';
import {ToastService} from '../../commons/toast.service';
import {EventService} from '../../commons/event.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-pcc-create',
  templateUrl: './pcc-create.component.html',
  styleUrl: './pcc-create.component.css',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    RouterLink
  ],
  standalone: true
})
export class PccCreateComponent implements OnInit {
  @Input() consumer!: Consumer
  pccForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private pccService: PccService,
    private toastService: ToastService,
    private eventService: EventService,
  ) {
  }

  ngOnInit(): void {
    this.pccForm = this.formBuilder.group({
      company: ['', Validators.required],
      subject: ['', [Validators.required, Validators.maxLength(250)]],
      description: ['', [Validators.required, Validators.minLength(100), Validators.maxLength(1000)]],
    });
  }

  createPcc(pcc: any) {
    this.pccService.createPcc(pcc.company, this.consumer.id, pcc)
      .subscribe((pcc: Pcc): void => {
        this.toastService.showSuccess('La PQR ha sido creada exitosamente');
        this.pccForm.reset()
      })
  }

  clearConsumer() {
    this.eventService.clearConsumer.emit()
  }
}
