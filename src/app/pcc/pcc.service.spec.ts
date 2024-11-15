import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PccService } from './pcc.service';
import { Pcc } from './pcc';
import { Consumer } from '../consumer/consumer';
import { Company } from '../company/company';

describe('PccService', () => {
  let service: PccService;
  let httpTestingController: HttpTestingController;

  const mockConsumer: Consumer = {
    id: 'consumer123',
    identification_type: 'CC',
    identification_number: '123456789',
    name: '',
    email: '',
    contact_number: '',
    address: '',
    companies: [],
    pccs: [],
  };

  const mockCompany: Company = { id: 'company123', name: 'Test Company' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PccService],
    });

    service = TestBed.inject(PccService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
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
        company: mockCompany,
        notifications: [],
        create_at: new Date(),
      };
      const mockResponse: Pcc = { ...newPcc, id: 'pcc789' };

      service.createPcc(companyId, consumerId, newPcc).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpTestingController.expectOne(
        `/api/companies/${companyId}/consumers/${consumerId}/pccs`
      );
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(newPcc);
      req.flush(mockResponse);
    });
  });

  describe('#getPccList', () => {
    const mockPccList: Pcc[] = [
      {
        id: 'PQR001',
        status: 'Pending',
        subject: 'Subject 1',
        description: 'Description 1',
        consumer: mockConsumer,
        company: mockCompany,
        notifications: [],
        create_at: new Date(),
      },
      {
        id: 'PQR002',
        status: 'Closed',
        subject: 'Subject 2',
        description: 'Description 2',
        consumer: mockConsumer,
        company: mockCompany,
        notifications: [],
        create_at: new Date(),
      },
    ];

    it('should return a list of Pcc objects for AGENT role', () => {
      service.getPccList('AGENT').subscribe((pccList) => {
        expect(pccList).toEqual(mockPccList);
      });

      const req = httpTestingController.expectOne('/api/agents/pccs');
      expect(req.request.method).toEqual('GET');
      req.flush(mockPccList);
    });

    it('should return a list of Pcc objects for CLIENT role', () => {
      service.getPccList('CLIENT').subscribe((pccList) => {
        expect(pccList).toEqual(mockPccList);
      });

      const req = httpTestingController.expectOne('/api/clients/pccs');
      expect(req.request.method).toEqual('GET');
      req.flush(mockPccList);
    });

    it('should handle errors when fetching the Pcc list', () => {
      service.getPccList('AGENT').subscribe(
        () => fail('Expected an error, but received data'),
        (error) => {
          expect(error.message).toContain('500');
          expect(error.message).toContain('Server Error');
        }
      );

      const req = httpTestingController.expectOne('/api/agents/pccs');
      req.flush('Failed to load Pcc list', {
        status: 500,
        statusText: 'Server Error',
      });
    });
  });

  describe('#getPccDetail', () => {
    it('should retrieve the Pcc detail by ID', () => {
      const mockPccDetail: Pcc = {
        id: 'PQR001',
        status: 'Pending',
        subject: 'Detailed Subject',
        description: 'Detailed Description',
        consumer: mockConsumer,
        company: mockCompany,
        notifications: [],
        create_at: new Date(),
      };

      service.getPccDetail('PQR001').subscribe((pccDetail) => {
        expect(pccDetail).toEqual(mockPccDetail);
      });

      const req = httpTestingController.expectOne('/api/pccs/PQR001');
      expect(req.request.method).toEqual('GET');
      req.flush(mockPccDetail);
    });

    it('should handle errors when retrieving the Pcc detail', () => {
      service.getPccDetail('PQR001').subscribe(
        () => fail('Expected an error, but received data'),
        (error) => {
          expect(error.message).toContain('404');
          expect(error.message).toContain('Not Found');
        }
      );

      const req = httpTestingController.expectOne('/api/pccs/PQR001');
      req.flush('Pcc not found', { status: 404, statusText: 'Not Found' });
    });
  });
});
