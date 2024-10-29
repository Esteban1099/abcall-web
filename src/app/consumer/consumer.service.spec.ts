import { TestBed, waitForAsync } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ConsumerService } from './consumer.service';
import { Consumer } from './consumer';

describe('ConsumerService', () => {
  let service: ConsumerService;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConsumerService],
    });
    service = TestBed.inject(ConsumerService);
    httpMock = TestBed.inject(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests remain
  });

  // Test fetching consumer details
  it('should fetch consumer details from the API', () => {
    const mockConsumer: Consumer = {
      id: '123',
      identification_type: 'Pasaporte',
      identification_number: 'A1234567',
      name: 'John Doe',
      email: 'john.doe@example.com',
      contact_number: '555-5555',
      address: '123 Main St',
      companies: [{ id: '1', name: 'Company A' }],
      pccs: [],
    };

    // Simulate sessionStorage token
    sessionStorage.setItem('token', JSON.stringify({ token: 'mock-token' }));

    // Call the service method
    service
      .getConsumer({
        identification_type: 'Pasaporte',
        identification_number: 'A1234567',
      } as Consumer)
      .subscribe((consumer) => {
        expect(consumer).toEqual(mockConsumer); // Check the response
      });

    // Check the outgoing HTTP request
    const req = httpMock.expectOne('/api/consumers/identification_type/Pasaporte/identification_number/A1234567');
    expect(req.request.method).toBe('GET'); // Make sure it's a GET request


    // Provide a mock response
    req.flush(mockConsumer);
  });

  // Test handling of errors in getConsumerDetails
  it('should handle errors when fetching consumer details', () => {
    const mockError = { status: 404, statusText: 'Not Found' };

    service
      .getConsumer({
        identification_type: 'Pasaporte',
        identification_number: 'A1234567',
      } as Consumer)
      .subscribe(
        () => fail('Should have failed with a 404 error'),
        (error) => {
          expect(error.status).toBe(404); // Verify that the error is caught
        }
      );

    // Simulate an error response
    const req = httpMock.expectOne('/api/consumers/identification_type/Pasaporte/identification_number/A1234567');
    req.flush('Error fetching consumer details', mockError);
  });

  // Test getActualConsumerDetails method
  it('should return the last fetched consumer details', () => {
    const mockConsumer: Consumer = {
      id: '123',
      identification_type: 'Pasaporte',
      identification_number: 'A1234567',
      name: 'John Doe',
      email: 'john.doe@example.com',
      contact_number: '555-5555',
      address: '123 Main St',
      companies: [{ id: '1', name: 'Company A' }],
      pccs: [],
    };

    // Set the consumer details in the service
    service.getConsumer(mockConsumer).subscribe();
    const req = httpMock.expectOne(
      `/api/consumers/identification_type/${mockConsumer.identification_type}/identification_number/${mockConsumer.identification_number}`
    );
    req.flush(mockConsumer);
  });
});
