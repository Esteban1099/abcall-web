/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { HttpErrorInterceptorService } from './http-error-interceptor.service';

describe('Service: HttpErrorInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot()],
      providers: [HttpErrorInterceptorService],
    });
  });

  it('should ...', inject(
    [HttpErrorInterceptorService],
    (service: HttpErrorInterceptorService) => {
      expect(service).toBeTruthy();
    }
  ));
});
