import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthLoginComponent } from './auth/auth-login/auth-login.component';
import { ConsumerComponent } from './consumer/consumer.component';
import { ConsumerDetailComponent } from './consumer/consumer-detail/consumer-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'auth/login', component: AuthLoginComponent },
  { path: 'consumer', component: ConsumerComponent },
  { path: 'consumer/detail', component: ConsumerDetailComponent },
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
