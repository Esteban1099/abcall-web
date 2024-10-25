import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConsumerService } from './consumer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Consumer } from './consumer';

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.css'],
})
export class ConsumerComponent implements OnInit {
  callBy: string = 'CONSUMER';
  consumerForm!: FormGroup;
  action: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private consumerService: ConsumerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const token = sessionStorage.getItem('user')
      ? JSON.parse(sessionStorage.getItem('user')!).token
      : null;
    if (!token) {
      this.router.navigate(['/auth']);
    }

    this.route.queryParams.subscribe(params => {
      this.action = params['action'];
    });

    this.route.queryParams.subscribe((params) => {
      if (
        params['callBy'] !== undefined &&
        params['callBy'] !== null &&
        params['callBy'].trim() !== ''
      ) {
        this.callBy = params['callBy'];
      }
    });

    this.consumerForm = this.formBuilder.group({
      identification_type: ['', [Validators.required]],
      identification_number: ['', [Validators.required]],
    });
  }

  getConsumerDetails(consumer: Consumer, action: string) {
    this.consumerService
      .getConsumerDetails(consumer)
      .subscribe((consumerDetails) => {
        console.info('Consumer details: ', consumerDetails);
        this.toastr.success('Confirmation', 'Consumer details fetched');
        this.consumerForm.reset();
        this.router.navigate(['/consumer/detail'], { queryParams: { action } });
      });
  }

  goBack() {
    this.consumerForm.reset();
    if (this.callBy === 'CONSUMER') {
      this.router.navigate(['/auth']);
    }
  }
}
