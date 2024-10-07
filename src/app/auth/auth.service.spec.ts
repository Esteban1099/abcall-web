/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: Auth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AuthService],
    });
  });

  it('should ...', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
