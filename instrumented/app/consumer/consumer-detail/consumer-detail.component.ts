import {Component, OnInit} from '@angular/core';
import {Consumer} from '../consumer';
import {ConsumerService} from '../consumer.service';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {PccCreateComponent} from '../../pcc/pcc-create/pcc-create.component';
import {EventService} from '../../commons/event.service';

@Component({
  selector: 'app-consumer-detail',
  templateUrl: './consumer-detail.component.html',
  styleUrls: ['./consumer-detail.component.css'],
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    RouterLink,
    PccCreateComponent
  ],
  standalone: true
})
export class ConsumerDetailComponent implements OnInit {
  consumerForm!: FormGroup;
  consumer!: Consumer;
  actualRoute !: string;

  constructor(
    private consumerService: ConsumerService,
    private router: Router,
    private formBuilder: FormBuilder,
    private eventService: EventService,
  ) {
  }

  ngOnInit() {
    this.actualRoute = this.router.url;
    this.consumerForm = this.formBuilder.group({
      identification_type: ['', [Validators.required]],
      identification_number: ['', [Validators.required]],
    });
    this.eventService.clearConsumer.subscribe((): void => {
      this.clearConsumer();
    })
  }

  getConsumerDetails(consumer: Consumer) {
    this.consumerService
      .getConsumer(consumer)
      .subscribe((consumer: Consumer) => {
        this.consumerForm.reset();
        this.consumer = consumer;
      });
  }

  clearConsumer() {
    this.consumer = undefined as any;
  }
}
