/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConsumerService } from './consumer.service';

describe('Service: Consumer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsumerService]
    });
  });

  it('should ...', inject([ConsumerService], (service: ConsumerService) => {
    expect(service).toBeTruthy();
  }));
});
