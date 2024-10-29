import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PccService } from './pcc.service';
import { Pcc } from './pcc';

describe('PccService', () => {
  let service: PccService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PccService]
    });

    service = TestBed.inject(PccService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifica que no haya solicitudes pendientes después de cada prueba
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
        subject: 'Test Subject',
        description: 'Test Description'
      };
      const mockResponse: Pcc = {
        id: 'pcc789',
        subject: 'Test Subject',
        description: 'Test Description'
      };

      // Llama al método createPcc del servicio
      service.createPcc(companyId, consumerId, newPcc).subscribe((response) => {
        expect(response).toEqual(mockResponse); // Verifica que la respuesta sea la esperada
      });

      // Verifica que la solicitud HTTP fue enviada correctamente
      const req = httpTestingController.expectOne(`/api/companies/${companyId}/consumers/${consumerId}/pccs`);
      expect(req.request.method).toEqual('POST'); // Verifica que el método sea POST
      expect(req.request.body).toEqual(newPcc); // Verifica que el cuerpo de la solicitud sea el objeto Pcc proporcionado

      req.flush(mockResponse); // Simula la respuesta de la API con el objeto mockResponse
    });
  });
});
