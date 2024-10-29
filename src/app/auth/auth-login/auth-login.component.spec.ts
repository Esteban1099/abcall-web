import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthLoginComponent } from './auth-login.component';
import { AuthService } from '../auth.service';
import { EventService } from '../../commons/event.service';
import { ToastService } from '../../commons/toast.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { EventEmitter } from '@angular/core';

describe('AuthLoginComponent', () => {
  let component: AuthLoginComponent;
  let fixture: ComponentFixture<AuthLoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let eventService: Partial<EventService>;
  let toastService: jasmine.SpyObj<ToastService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    authService = jasmine.createSpyObj('AuthService', ['loginClient', 'loginAgent']);
    toastService = jasmine.createSpyObj('ToastService', ['showSuccess', 'showError']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    eventService = {
      backAuthLogin: new EventEmitter<void>(),
      showMenu: new EventEmitter<void>(),
      showBackAuthLogin: new EventEmitter<void>(),
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, AuthLoginComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: EventService, useValue: eventService },
        { provide: ToastService, useValue: toastService },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should clear role on backAuthLogin event', () => {
    component.setRole('CLIENT');

    // Emitir el evento backAuthLogin para simular el comportamiento
    (eventService.backAuthLogin as EventEmitter<void>).emit();
    fixture.detectChanges();

    expect(component.role).toBeUndefined();
    expect(localStorage.getItem('role')).toBeNull();
  });

  it('should call showSuccess and navigate on successful login as CLIENT', () => {
    component.setRole('CLIENT');
    const mockUser = { email: 'client@example.com', password: 'password123' };
    const mockResponse = { token: 'mock-token' };
    authService.loginClient.and.returnValue(of(mockResponse));

    component.login(mockUser);

    expect(authService.loginClient).toHaveBeenCalledWith(mockUser);
    expect(localStorage.getItem('token')).toBe('mock-token');
    expect(toastService.showSuccess).toHaveBeenCalledWith('Bienvenido!');
    expect(router.navigate).toHaveBeenCalledWith(['/pcc-list']);
  });

  it('should call showSuccess and navigate on successful login as AGENT', () => {
    component.setRole('AGENT');
    const mockUser = { email: 'agent@example.com', password: 'password123' };
    const mockResponse = { token: 'mock-token' };
    authService.loginAgent.and.returnValue(of(mockResponse));

    component.login(mockUser);

    expect(authService.loginAgent).toHaveBeenCalledWith(mockUser);
    expect(localStorage.getItem('token')).toBe('mock-token');
    expect(toastService.showSuccess).toHaveBeenCalledWith('Bienvenido!');
    expect(router.navigate).toHaveBeenCalledWith(['/pcc-list']);
  });

  it('should show error if role is not selected', () => {
    const mockUser = { email: 'user@example.com', password: 'password123' };

    component.login(mockUser);

    expect(authService.loginClient).not.toHaveBeenCalled();
    expect(authService.loginAgent).not.toHaveBeenCalled();
    expect(toastService.showError).toHaveBeenCalledWith('Rol no seleccionado');
  });
});
