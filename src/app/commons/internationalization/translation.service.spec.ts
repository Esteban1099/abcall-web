/* tslint:disable:no-unused-variable */

import { TestBed, waitForAsync, inject } from '@angular/core/testing';
import { TranslationService } from './translation.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('Service: Translation', () => {
  let translationService: TranslationService;
  let translateService: TranslateService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [TranslationService],
    });

    translationService = TestBed.inject(TranslationService);
    translateService = TestBed.inject(TranslateService);
  }));

  it('should be created', () => {
    expect(translationService).toBeTruthy();
  });

  it('should set default language to "es-CO"', () => {
    expect(translateService.defaultLang).toBe('es-CO');
  });

  it('should use "es-CO" as the initial language', () => {
    expect(translateService.currentLang).toBeUndefined();
    translationService.getCurrentLanguage();
    expect(translationService.getCurrentLanguage()).toBe('es-CO');
  });

  it('should change language when setLanguage is called', () => {
    translationService.setLanguage('en-US');
    expect(translateService.currentLang).toBe('en-US');
  });

  it('should return the current language from getCurrentLanguage', () => {
    translationService.setLanguage('en-US');
    expect(translationService.getCurrentLanguage()).toBe('en-US');
  });
});
