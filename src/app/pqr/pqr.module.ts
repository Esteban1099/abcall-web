import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PqrCreateComponent } from './pqr-create/pqr-create.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PqrCreateComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  exports: [PqrCreateComponent],
})
export class PqrModule {}
