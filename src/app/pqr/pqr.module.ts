import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PqrRoutingModule } from './pqr-routing.module';
import { PqrListComponent } from './pqr-list/pqr-list.component';
import { CreatePqrComponent } from './create-pqr/create-pqr.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PqrListComponent,
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
