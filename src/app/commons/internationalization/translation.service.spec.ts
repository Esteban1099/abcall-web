/* tslint:disable:no-unused-variable */

import { TestBed, waitForAsync, inject } from '@angular/core/testing';
import { TranslationService } from './translation.service';
import { TranslateModule } from '@ngx-translate/core';

describe('Service: Translation', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [TranslationService],
    });
  }));

  it('should ...', inject(
    [TranslationService],
    (service: TranslationService) => {
      expect(service).toBeTruthy();
    }
  ));
});
