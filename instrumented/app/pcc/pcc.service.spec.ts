import { TestBed } from '@angular/core/testing';

import { PccService } from './pcc.service';

describe('PccService', () => {
  let service: PccService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PccService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
