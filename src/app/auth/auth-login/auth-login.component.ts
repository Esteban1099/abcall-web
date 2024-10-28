import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {User} from '../user';
import {AuthService} from '../auth.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {EventService} from '../../commons/event.service';
import {Observable} from 'rxjs';
import {ToastService} from '../../commons/toast.service';

@Component({
  standalone: true,
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css'],
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ]
})
export class AuthLoginComponent implements OnInit {
  role?: string;
  authForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private toastService: ToastService,
  ) {
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.eventService.backAuthLogin.subscribe((): void => {
      this.role = undefined;
      localStorage.removeItem('role');
    })
  }

  setRole(role: string) {
    this.role = role;
    localStorage.setItem('role', role);
  }

  login(user: User) {
    if (this.role){
      let response: Observable<any> | null = null;
      if (this.role === 'CLIENT') {
        response = this.authService.loginClient(user);
      } else if (this.role === 'AGENT') {
        response = this.authService.loginAgent(user);
      }
      if (response) {
        response.subscribe((response: any): void => {
          localStorage.setItem('token', response.token);
          this.toastService.showSuccess('Sesión iniciada. Puede seguir trabajando');
        })
      }
    } else {
      this.toastService.showError('Role no seleccionado');
    }

  }
}
