import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css'],
})
export class AuthLoginComponent implements OnInit {
  role: string | null = '';
  authForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.role = params['role'];
    });

    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login(user: User) {
    user.role = this.role ?? 'Undefined';

    this.authService.login(user).subscribe(
      (token) => {
        console.info('Login succesfull: ', token);
        user.token = token;
        this.toastr.success('Confirmation', 'Login succesfull');
        this.authForm.reset();
      },
      (error) => {
        if (error.name === 'RoleError') {
          this.toastr.error('Error', error.message);
        }
      }
    );
  }
}
