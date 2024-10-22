import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PqrRoutingModule } from './pqr-routing.module';
import { PqrListComponent } from './components/pqr-list/pqr-list.component';
import { CreatePqrComponent } from './components/create-pqr/create-pqr.component';
import { SearchConsumerComponent } from './components/search-consumer/search-consumer.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PqrListComponent,
    CreatePqrComponent,
    SearchConsumerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PqrRoutingModule,
    SharedModule
  ]
})
export class PqrModule { }
