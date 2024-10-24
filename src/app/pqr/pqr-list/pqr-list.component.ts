// Importaciones necesarias
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pqr-list',
  templateUrl: './pqr-list.component.html',
  styleUrls: ['./pqr-list.component.css']
})
export class PqrListComponent implements OnInit {
  searchTerm: string = '';
  menuOpen: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Inicializar la vista
  }

  // Filtrar los PQRs según el término de búsqueda
  onSearch(): void {
    // Lógica de búsqueda básica
    console.log('Buscando:', this.searchTerm);
  }

  // Navegar para ver el detalle de un PQR específico
  verDetalle(pqrId: string): void {
    this.router.navigate([`/pqr/detail/${pqrId}`]);
  }

  // Alternar el estado del menú
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  // Navegar a una ruta específica
  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }
}
