import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PQRService } from './pqr.service';
import { PQR } from './pqr';
import { HttpErrorResponse } from '@angular/common/http';

describe('PQRService', () => {
  let service: PQRService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PQRService],
    });

    service = TestBed.inject(PQRService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify no outstanding requests
  });

  // Test successful PQR creation
  it('should create a PQR successfully', () => {
    const mockResponse = { id: '12345', status: 'created' };
    const mockPQR: PQR = {
      subject: 'Sample PQR',
      description: 'This is a sample PQR description.',
    };
    const companyId = 'company123';
    const consumerId = 'consumer456';

    // Spy on sessionStorage to simulate the token retrieval
    spyOn(sessionStorage, 'getItem').and.returnValue(
      JSON.stringify({ token: 'mock-token' })
    );

    service.createPQR(companyId, consumerId, mockPQR).subscribe((response) => {
      expect(response).toEqual(mockResponse); // Verify response matches mock data
    });

    const req = httpMock.expectOne(
      `/companies/${companyId}/consumers/${consumerId}/pccs`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');

    req.flush(mockResponse); // Return mock response
  });

  // Test empty response handling
  it('should throw an error if the response is empty', () => {
    const mockPQR: PQR = {
      subject: 'Sample PQR',
      description: 'This is a sample PQR description.',
    };
    const companyId = 'company123';
    const consumerId = 'consumer456';

    spyOn(sessionStorage, 'getItem').and.returnValue(
      JSON.stringify({ token: 'mock-token' })
    );

    service.createPQR(companyId, consumerId, mockPQR).subscribe(
      () => fail('Expected an error, but got a successful response'),
      (error) => {
        expect(error.message).toBe('Error en la creación del PQR');
      }
    );

    const req = httpMock.expectOne(
      `/companies/${companyId}/consumers/${consumerId}/pccs`
    );
    req.flush({}); // Simulate an empty response
  });

  // Test error handling on failed request
  it('should handle an error response gracefully', () => {
    const mockPQR: PQR = {
      subject: 'Sample PQR',
      description: 'This is a sample PQR description.',
    };
    const companyId = 'company123';
    const consumerId = 'consumer456';

    // Spy on sessionStorage to simulate the token retrieval
    spyOn(sessionStorage, 'getItem').and.returnValue(
      JSON.stringify({ token: 'mock-token' })
    );

    service.createPQR(companyId, consumerId, mockPQR).subscribe(
      () => fail('Expected an error, but got a successful response'),
      (error) => {
        expect(error.message).toBe('Error en la creación del PQR');
      }
    );

    const req = httpMock.expectOne(
      `/companies/${companyId}/consumers/${consumerId}/pccs`
    );
    req.flush('Error occurred', { status: 500, statusText: 'Server Error' });
  });
});
