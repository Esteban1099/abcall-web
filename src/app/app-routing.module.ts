import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginComponent } from './auth/auth-login/auth-login.component';
import { ConsumerComponent } from './consumer/consumer.component';
import { ConsumerDetailComponent } from './consumer/consumer-detail/consumer-detail.component';
import { PqrCreateComponent } from './pqr/pqr-create/pqr-create.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthLoginComponent },
  { path: 'auth/login', component: AuthLoginComponent },
  { path: 'consumer', component: ConsumerComponent },
  { path: 'consumer/detail', component: ConsumerDetailComponent },
  { path: 'pqr/create', component: PqrCreateComponent },
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
