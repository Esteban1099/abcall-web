import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PccService } from './pcc.service';
import { Pcc } from './pcc';
import { SimplifiedConsumer } from '../consumer/consumer';

describe('PccService', () => {
  let service: PccService;
  let httpTestingController: HttpTestingController;

  // Define a mock SimplifiedConsumer
  const mockConsumer: SimplifiedConsumer = {
    id: 'consumer123',
    identification_type: 'CC',
    identification_number: '123456789',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PccService],
    });

    service = TestBed.inject(PccService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure no outstanding requests after each test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#createPcc', () => {
    it('should send a POST request to the correct URL and return the created Pcc', () => {
      const companyId = 'company123';
      const consumerId = 'consumer456';
      const newPcc: Pcc = {
        id: '',
        status: 'Pending',
        subject: 'Test Subject',
        description: 'Test Description',
        consumer: mockConsumer,
      };
      const mockResponse: Pcc = {
        id: 'pcc789',
        status: 'Pending',
        subject: 'Test Subject',
        description: 'Test Description',
        consumer: mockConsumer,
      };

      // Call the createPcc method
      service.createPcc(companyId, consumerId, newPcc).subscribe((response) => {
        expect(response).toEqual(mockResponse); // Verify that the response matches
      });

      // Verify the request details
      const req = httpTestingController.expectOne(
        `/api/companies/${companyId}/consumers/${consumerId}/pccs`
      );
      expect(req.request.method).toEqual('POST'); // Verify that the method is POST
      expect(req.request.body).toEqual(newPcc); // Verify the request body

      req.flush(mockResponse); // Simulate API response with mockResponse
    });
  });

  describe('#getPccList', () => {
    it('should return a list of Pcc objects', () => {
      const mockPccList: Pcc[] = [
        {
          id: 'PQR001',
          status: 'In Review',
          subject: 'Subject 1',
          description: 'Description 1',
          consumer: mockConsumer,
        },
        {
          id: 'PQR002',
          status: 'Closed',
          subject: 'Subject 2',
          description: 'Description 2',
          consumer: mockConsumer,
        },
        {
          id: 'PQR003',
          status: 'Open',
          subject: 'Subject 3',
          description: 'Description 3',
          consumer: mockConsumer,
        },
      ];

      // Call the getPccList method
      service.getPccList().subscribe((pccList) => {
        expect(pccList).toEqual(mockPccList); // Verify that the list matches mock data
      });

      // Verify the request details
      const req = httpTestingController.expectOne('/api/agents/pccs');
      expect(req.request.method).toEqual('GET'); // Verify that the method is GET

      req.flush(mockPccList); // Simulate API response with mockPccList
    });

    it('should handle errors when fetching the Pcc list', () => {
      service.getPccList().subscribe(
        () => fail('Expected an error, but received data'),
        (error) => {
          expect(error.message).toContain('500'); // Checking the status code in the error message
          expect(error.message).toContain('Server Error'); // Checking the status text
        }
      );

      const req = httpTestingController.expectOne('/api/agents/pccs');
      req.flush('Failed to load Pcc list', {
        status: 500,
        statusText: 'Server Error',
      });
    });
  });
});
