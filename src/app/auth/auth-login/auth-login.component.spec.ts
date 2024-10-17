/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AuthLoginComponent } from './auth-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AuthLoginComponent', () => {
  let component: AuthLoginComponent;
  let fixture: ComponentFixture<AuthLoginComponent>;
  let debug: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ToastrModule.forRoot(), HttpClientModule],
      declarations: [AuthLoginComponent],
      providers: [
        AuthService,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ role: 'CLIENT' }),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title ', () => {
    const dd = debug.query(By.css('h1'));
    const content: HTMLElement = dd.nativeElement;
    expect(content.textContent).toEqual('ABCall');
  });

  it('should have subtitle ', () => {
    const dd = debug.query(By.css('h3'));
    const content: HTMLElement = dd.nativeElement;
    expect(content.textContent).toEqual('Iniciar sesión');
  });

  it('should have label for the fields in form', () => {
    debug.queryAll(By.css('label')).forEach((label, i) => {
      if (i == 0) {
        expect(label.nativeElement.textContent).toContain('Correo electrónico');
      } else if (i == 1) {
        expect(label.nativeElement.textContent).toContain('Contraseña');
      }
    });
  });

  it('should have input with id email;', () => {
    expect(debug.queryAll(By.css('#email'))).toHaveSize(1);
  });

  it('should have input with id password', () => {
    expect(debug.queryAll(By.css('#password'))).toHaveSize(1);
  });
});
