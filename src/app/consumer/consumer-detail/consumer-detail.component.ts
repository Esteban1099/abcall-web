import { Component, OnInit } from '@angular/core';
import { Consumer, Company } from '../consumer';
import { ConsumerService } from '../consumer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PQR } from '../../pqr/pqr';


@Component({
  selector: 'app-consumer-detail',
  templateUrl: './consumer-detail.component.html',
  styleUrls: ['./consumer-detail.component.css'],
})
export class ConsumerDetailComponent implements OnInit {
  consumerDetails!: Consumer;
  action: string | null = null;
  selectedCompany!: Company;
  pqrForm!: FormGroup;
  consumerId!: string;
  companyId!: string;


  constructor(
    private consumerService: ConsumerService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
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

  ngOnInit() {
    const token = sessionStorage.getItem('user')
      ? JSON.parse(sessionStorage.getItem('user')!).token
      : null;
    if (!token) {
      this.router.navigate(['/auth']);
    }

    this.route.params.subscribe(params => {
      this.consumerId = params['consumer_id'];
      this.companyId = params['company_id'];
    });

    this.pqrForm = this.fb.group({
      subject: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      this.action = params['action']; // "view" or "createPQR"
    });

    // Get the consumer details from the service
    this.consumerDetails = this.consumerService.getActualConsumerDetails();

    // If consumerDetails are not available, handle it (e.g., direct access without navigating)
    if (!this.consumerDetails) {
      console.error('No consumer details found');
      // Optionally, navigate back or show an error message
    } else {
      console.info('Actual consumer details:', this.consumerDetails);
    }
  }

  goBack() {
    this.router.navigate(['/consumer']);
  }

  goInit() {
    this.router.navigate(['/consumer']);
  }

  // Método para enviar los datos del formulario y crear la PQR
  submitPQR(): void {
    if (this.pqrForm.valid && this.consumerId && this.companyId) {
      const newPQR = new PQR(
        this.pqrForm.value.subject,
        this.pqrForm.value.description,
        this.consumerId,
        this.companyId
      );

    }

  }
}
