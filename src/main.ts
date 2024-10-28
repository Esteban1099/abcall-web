/// <reference types="@angular/localize" />

import { enableProdMode, LOCALE_ID } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import '@angular/localize/init';

function getLocale() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('lang') || 'en';
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    providers: [{ provide: LOCALE_ID, useValue: getLocale() }],
  })
  .catch((err) => console.error(err));
