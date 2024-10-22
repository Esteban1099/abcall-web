import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.css']
})
export class HamburgerMenuComponent {
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
