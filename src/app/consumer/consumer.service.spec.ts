import { TestBed, waitForAsync } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ConsumerService } from './consumer.service';
import { Consumer } from './consumer';
import { HttpHeaders } from '@angular/common/http';

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

  // Test default consumer values
  it('should initialize with default consumer values', () => {
    const defaultConsumer: Consumer = service.getActualConsumerDetails();
    expect(defaultConsumer).toEqual({
      id: '',
      identification_type: '',
      identification_number: '',
      name: '',
      email: '',
      contact_number: '',
      address: '',
      companies: [],
    });
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
    };

    // Simulate sessionStorage token
    sessionStorage.setItem('user', JSON.stringify({ token: 'mock-token' }));

    // Call the service method
    service
      .getConsumerDetails({
        identification_type: 'Pasaporte',
        identification_number: 'A1234567',
      } as Consumer)
      .subscribe((consumer) => {
        expect(consumer).toEqual(mockConsumer); // Check the response
      });

    // Check the outgoing HTTP request
    const req = httpMock.expectOne('/consumer/details/Pasaporte/A1234567');
    expect(req.request.method).toBe('GET'); // Make sure it's a GET request
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token'); // Check the token in headers

    // Provide a mock response
    req.flush(mockConsumer);
  });

  // Test handling of errors in getConsumerDetails
  it('should handle errors when fetching consumer details', () => {
    const mockError = { status: 404, statusText: 'Not Found' };

    service
      .getConsumerDetails({
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
    const req = httpMock.expectOne('/consumer/details/Pasaporte/A1234567');
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
    };

    // Set the consumer details in the service
    service.getConsumerDetails(mockConsumer).subscribe();
    const req = httpMock.expectOne(
      `/consumer/details/${mockConsumer.identification_type}/${mockConsumer.identification_number}`
    );
    req.flush(mockConsumer);

    // Check that the details are returned correctly from the service
    expect(service.getActualConsumerDetails()).toEqual(mockConsumer);
  });
});
