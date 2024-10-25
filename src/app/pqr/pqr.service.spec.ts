/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PqrService } from './pqr.service';

describe('Service: Pqr', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PqrService]
    });
  });

  it('should ...', inject([PqrService], (service: PqrService) => {
    expect(service).toBeTruthy();
  }));
});
