import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importar los componentes de PQR
import { PqrListComponent } from './pqr-list/pqr-list.component';
import { CreatePqrComponent } from './create-pqr/create-pqr.component';
import { BuscarConsumidorComponent } from '../consumer/search-consumer/search-consumer.component';

const routes: Routes = [
  { path: 'list-pqr', component: PqrListComponent },
  { path: 'create-pqr', component: CreatePqrComponent },
  { path: 'search-pqr', component: BuscarConsumidorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PqrRoutingModule { }
