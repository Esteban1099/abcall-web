import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css'],
})
export class AuthLoginComponent implements OnInit {
  authForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  login(user: User) {
    console.info('Login succesfull: ', user);
    this.toastr.success('Confirmation', 'Login succesfull');
    this.authForm.reset();

    // this.authService.login(user).subscribe((user) => {
    //   console.info('Login succesfull: ', user);
    //   this.toastr.success('Confirmation', 'Login succesfull');
    //   this.authForm.reset();
    // });
  }
}
