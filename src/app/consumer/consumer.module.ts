import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumerComponent } from './consumer.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ConsumerDetailComponent } from './consumer-detail/consumer-detail.component';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  declarations: [ConsumerComponent, ConsumerDetailComponent],
  exports: [ConsumerComponent],
})
export class ConsumerModule {}
