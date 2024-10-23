import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthLoginComponent } from './auth/auth-login/auth-login.component';
import { BuscarConsumidorComponent } from './shared/buscar-consumidor/buscar-consumidor.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'auth/login', component: AuthLoginComponent },
  { path: 'pqr', loadChildren: () => import('./pqr/pqr.module').then(m => m.PqrModule) },
  { path: 'pqr/search-consumer', component: BuscarConsumidorComponent },
  { path: 'pqr/list-pqr', loadChildren: () => import('./pqr/pqr.module').then(m => m.PqrModule) },
  { path: '**', redirectTo: 'auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
