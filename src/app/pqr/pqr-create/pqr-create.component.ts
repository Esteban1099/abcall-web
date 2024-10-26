import { Component } from '@angular/core';
import { Company, Consumer } from '../../consumer/consumer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsumerService } from '../../consumer/consumer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PQRService } from '../pqr.service';
import { ToastrService } from 'ngx-toastr';
import { PQR } from '../pqr';

@Component({
  selector: 'app-pqr-create',
  templateUrl: './pqr-create.component.html',
  styleUrl: './pqr-create.component.css',
})
export class PqrCreateComponent {
  consumerDetails!: Consumer;
  selectedCompany!: Company;
  pqrForm!: FormGroup;
  consumerId!: string;
  companyId!: string;

  constructor(
    private consumerService: ConsumerService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private pqrService: PQRService,
    private toastr: ToastrService
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
      pccs: [],
    };
  }

  ngOnInit() {
    const token = sessionStorage.getItem('user')
      ? JSON.parse(sessionStorage.getItem('user')!).token
      : null;
    if (!token) {
      this.router.navigate(['/auth']);
    }

    this.route.params.subscribe((params) => {
      this.consumerId = params['consumer_id'];
      this.companyId = params['company_id'];
    });

    this.pqrForm = this.fb.group({
      subject: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(200)]],
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

    // Método para enviar los datos del formulario y crear la PQR
  }

  submitPQR(companyId: string, consumerId: string) {
    if (this.pqrForm.valid && consumerId && companyId) {
      const newPQR = new PQR(
        this.pqrForm.value.subject,
        this.pqrForm.value.description
      );

      this.pqrService
        .createPQR(companyId, consumerId, newPQR)
        .subscribe((response) => {
          console.info('Consumer details: ', response);
          this.toastr.success('Confirmation', 'Consumer details fetched');
          this.pqrForm.reset();
        });
    } else {
      this.toastr.error(
        'Error',
        'Please fill in all fields. Consumer Id is' +
          consumerId +
          'Company Id is' +
          companyId
      );
    }
  }

  goBack() {
    this.router.navigate(['/consumer']);
  }

  goInit() {
    this.router.navigate(['/consumer']);
  }
}
