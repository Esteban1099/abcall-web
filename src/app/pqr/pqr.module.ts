import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PqrListComponent } from './pqr-list/pqr-list.component';
import { PqrCreateComponent } from './pqr-create/pqr-create.component';



@NgModule({
  declarations: [
    PqrListComponent,
    PqrCreateComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PqrModule { }
