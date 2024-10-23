import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-consumidor',
  templateUrl: './buscar-consumidor.component.html',
  styleUrl: './buscar-consumidor.component.css'
})
export class BuscarConsumidorComponent {
  menuOpen = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  navigateTo(path: string) {
    this.menuOpen = false; // Cierra el menú después de la navegación
    this.router.navigate([`/${path}`]);
  }

}
