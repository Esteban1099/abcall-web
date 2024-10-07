import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [CommonModule, RouterModule, AuthRoutingModule, ReactiveFormsModule],
  declarations: [AuthComponent, AuthLoginComponent],
  exports: [AuthComponent],
})
export class AuthModule {}
