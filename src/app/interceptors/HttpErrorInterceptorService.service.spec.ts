import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  HttpClient,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { HttpErrorInterceptorService } from './HttpErrorInterceptorService.service';

describe('Service: HttpErrorInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    toastrService = jasmine.createSpyObj('ToastrService', ['error']);

    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), HttpClientTestingModule],
      providers: [
        HttpErrorInterceptorService,
        { provide: ToastrService, useValue: toastrService },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptorService,
          multi: true,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should handle token error and show authentication error', () => {
    const mockErrorResponse = {
      error: { error_message: 'Invalid token' },
      status: 401,
      statusText: 'Unauthorized',
      url: '/auth/token',
    };

    httpClient.get('/auth/token').subscribe(
      () => fail('Expected an error, but got a success response'),
      (error: HttpErrorResponse) => {
        expect(toastrService.error).toHaveBeenCalledWith(
          'Credenciales inválidas',
          'Error en la autenticación',
          { closeButton: true }
        );
      }
    );

    const req = httpMock.expectOne('/auth/token');
    req.flush(mockErrorResponse.error, {
      status: 401,
      statusText: 'Unauthorized',
    });
  });

  // New Test Case 2: Server connection issue (status 0)
  it('should handle server connection issue', () => {
    httpClient.get('/consumer/details').subscribe(
      () => fail('Expected a connection error, but got a success response'),
      (error: HttpErrorResponse) => {
        expect(toastrService.error).toHaveBeenCalledWith(
          'No hay conexión con el servidor',
          'Server-side error',
          { closeButton: true }
        );
      }
    );

    const req = httpMock.expectOne('/consumer/details');
    req.flush(null, { status: 0, statusText: 'Unknown Error' }); // Simulate a connection issue (status 0)
  });

  // Test Case 3: Consumer not found (404 error)
  it('should handle consumer details not found (404)', () => {
    const mockErrorResponse = {
      status: 404,
      statusText: 'Not Found',
      message: '404 NOT FOUND',
      url: '/consumer/details',
    };

    httpClient.get('/consumer/details').subscribe(
      () => fail('Expected a 404 error, but got a success response'),
      (error: HttpErrorResponse) => {
        // Adjust test to expect the actual proxy error message
        expect(toastrService.error).toHaveBeenCalledWith(
          'No se encontro un consumidor con los datos ingresados',
          'Error en la consulta de consumidor',
          { closeButton: true }
        );
      }
    );

    const req = httpMock.expectOne('/consumer/details');
    req.flush(null, {
      status: 404,
      statusText: 'Not Found',
      headers: { 'content-type': 'application/json' },
    });
  });

  // Test Case 4: General server-side error (500)
  it('should handle general server-side error', () => {
    const mockErrorResponse = {
      status: 500,
      statusText: 'Internal Server Error',
      message: 'Server crashed',
      url: '/consumer/details',
    };

    httpClient.get('/consumer/details').subscribe(
      () => fail('Expected a 500 error, but got a success response'),
      (error: HttpErrorResponse) => {
        // Adjust the expected message to reflect Angular's default error response format
        expect(toastrService.error).toHaveBeenCalledWith(
          '500: Http failure response for /consumer/details: 500 Internal Server Error', // Adjusted message to match default format
          'Error en la consulta de consumidor', // Ensure the error type matches the handling in your interceptor
          { closeButton: true }
        );
      }
    );

    const req = httpMock.expectOne('/consumer/details');
    req.flush(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });
});
