import { Component, OnInit } from '@angular/core';
import { Consumer } from '../consumer';
import { ConsumerService } from '../consumer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-consumer-detail',
  templateUrl: './consumer-detail.component.html',
  styleUrls: ['./consumer-detail.component.css'],
})
export class ConsumerDetailComponent implements OnInit {
  consumerDetails: Consumer;
  action: string | null = null;

  constructor(
    private consumerService: ConsumerService,
    private router: Router,
    private route: ActivatedRoute,
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
}
