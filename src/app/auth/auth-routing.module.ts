import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginComponent } from './auth-login/auth-login.component';

const routes: Routes = [{ path: 'login', component: AuthLoginComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
