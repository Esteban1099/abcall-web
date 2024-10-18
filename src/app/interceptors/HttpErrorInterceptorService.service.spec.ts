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
          'Invalid token',
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

  it('should handle no server connection (status 0)', () => {
    const mockErrorResponse = new HttpErrorResponse({
      error: 'No connection',
      status: 0,
      statusText: 'Unknown Error',
    });

    httpClient.get('/test').subscribe(
      () => fail('Expected an error, but got a success response'),
      (error: HttpErrorResponse) => {
        expect(toastrService.error).toHaveBeenCalledWith(
          'No hay conexión con el servidor',
          'Server side error',
          { closeButton: true }
        );
      }
    );

    const req = httpMock.expectOne('/test');
    req.error(new ErrorEvent('Network error'));
  });
});
