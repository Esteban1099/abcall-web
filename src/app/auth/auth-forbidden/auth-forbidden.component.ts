import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../auth.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-auth-forbidden',
  templateUrl: './auth-forbidden.component.html',
  styleUrl: './auth-forbidden.component.css',
  imports: [RouterLink, NgIf, TranslateModule],
  standalone: true,
})
export class AuthForbiddenComponent implements OnInit {
  redirectToLogin: boolean = true;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticatedUser()) {
      this.redirectToLogin = false;
    }
  }
}
