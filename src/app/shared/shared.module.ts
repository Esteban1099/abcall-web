import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';
import { SearchConsumerComponent } from '../consumer/search-consumer/search-consumer.component';
import { CreatePqrComponent } from '../pqr/create-pqr/create-pqr.component';

@NgModule({
  declarations: [
    HamburgerMenuComponent,
    SearchConsumerComponent
  ],
  imports: [
    CommonModule,
    CreatePqrComponent
  ],
  exports: [
    HamburgerMenuComponent,
    SearchConsumerComponent
  ]
})
export class SharedModule { }
