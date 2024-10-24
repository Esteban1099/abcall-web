import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthLoginComponent } from './auth-login.component';
import { User } from '../user';

describe('AuthLoginComponent', () => {
  let component: AuthLoginComponent;
  let fixture: ComponentFixture<AuthLoginComponent>;
  let debug: DebugElement;
  let authService: jasmine.SpyObj<AuthService>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    authService = jasmine.createSpyObj('AuthService', ['login']);
    toastrService = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ToastrModule.forRoot(), HttpClientModule],
      declarations: [AuthLoginComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: ToastrService, useValue: toastrService },
        { provide: Router, useValue: router },
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

  // Test form initialization and validation
  it('should initialize the form with default values', () => {
    expect(component.authForm).toBeDefined();
    expect(component.authForm.get('email')?.value).toBe('');
    expect(component.authForm.get('password')?.value).toBe('');
    expect(component.authForm.valid).toBeFalse();
  });

  it('should validate the form', () => {
    component.authForm.patchValue({
      email: 'invalid-email',
      password: '',
    });
    expect(component.authForm.valid).toBeFalse(); // Invalid email and empty password

    component.authForm.patchValue({
      email: 'valid.email@example.com',
      password: 'validpassword',
    });
    expect(component.authForm.valid).toBeTrue(); // Form should be valid now
  });

  it('should navigate to /consumer when role is AGENT', () => {
    const mockUser: User = {
      email: 'agent@example.com',
      password: 'password123',
      role: 'AGENT',
      token: '',
    };

    const mockToken = 'mock-token';

    // Mock query parameters to set the role to AGENT
    component.role = 'AGENT';

    // Mock the login method to return a token
    authService.login.and.returnValue(of(mockToken));

    // Fill the form with valid credentials
    component.authForm.patchValue({
      email: 'agent@example.com',
      password: 'password123',
    });

    // Call the login method
    component.login(mockUser);

    // Verify the service call and that the correct role is passed
    expect(authService.login).toHaveBeenCalledWith(mockUser);

    // Check if sessionStorage is set correctly
    expect(sessionStorage.getItem('user')).toEqual(
      JSON.stringify({ ...mockUser, token: mockToken })
    );

    // Verify the navigation to the consumer route
    expect(router.navigate).toHaveBeenCalledWith(['/consumer']);
  });

  // Test error handling
  it('should show an error if login fails with RoleError', () => {
    const mockUser: User = {
      email: 'test@example.com',
      password: 'password123',
      role: 'CLIENT',
      token: '',
    };

    const roleError = { name: 'RoleError', message: 'Invalid role' };

    // Mock the login method to throw a RoleError
    authService.login.and.returnValue(throwError(roleError));

    // Call the login method
    component.login(mockUser);

    // Check if toastr shows an error
    expect(toastrService.error).toHaveBeenCalledWith('Error', 'Invalid role');
  });
});
