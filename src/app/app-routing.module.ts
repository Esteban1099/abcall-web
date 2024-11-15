import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthLoginComponent} from './auth/auth-login/auth-login.component';
import {ConsumerDetailComponent} from './consumer/consumer-detail/consumer-detail.component';
import {PccListComponent} from './pcc/pcc-list/pcc-list.component';
import {AuthGuard} from './commons/guards/auth.guard';
import {AuthForbiddenComponent} from './auth/auth-forbidden/auth-forbidden.component';
import { PccDetailComponent } from './pcc/pcc-detail/pcc-detail.component';
import { PccEditComponent } from './pcc/pcc-edit/pcc-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthLoginComponent
  },
  {
    path: 'consumer-detail',
    component: ConsumerDetailComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'pcc-create',
    component: ConsumerDetailComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'pcc-list',
    component: PccListComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'forbidden',
    component: AuthForbiddenComponent
  },
  {
    path: 'pcc-detail/:id',
    component: PccDetailComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'pcc-edit/:id',
    component: PccEditComponent,
    canActivate: [
      AuthGuard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
