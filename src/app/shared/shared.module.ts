import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';
import { BuscarConsumidorComponent } from './buscar-consumidor/buscar-consumidor.component';

@NgModule({
  declarations: [
    HamburgerMenuComponent,
    BuscarConsumidorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HamburgerMenuComponent,
    BuscarConsumidorComponent
  ]
})
export class SharedModule { }
