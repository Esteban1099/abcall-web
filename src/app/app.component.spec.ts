import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { EventService } from './commons/event.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastComponent } from './commons/toast/toast.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './auth/auth.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let eventService: EventService;
  let router: Router;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(waitForAsync(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'isAuthenticatedUser',
    ]);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ToastComponent, HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [
        EventService,
        { provide: AuthService, useValue: authServiceSpy },
      ],
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  }));

  beforeEach(() => {
    // Ensure isAuthenticatedUser returns false for default flag tests
    authService.isAuthenticatedUser.and.returnValue(false);

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    eventService = TestBed.inject(EventService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the default values for title and visibility flags', () => {
    expect(component.title).toBe('abcall-web');
    expect(component.showMenu).toBeFalse();
    expect(component.showLogOut).toBeFalse();
    expect(component.showBackOption).toBeFalse();
  });

  it('should update visibility flags when showMenu event is emitted', () => {
    eventService.showMenu.emit();
    fixture.detectChanges();
    expect(component.showMenu).toBeTrue();
    expect(component.showLogOut).toBeTrue();
    expect(component.showBackOption).toBeFalse();
  });

  it('should call backAuthLogin and emit backAuthLogin event', () => {
    spyOn(eventService.backAuthLogin, 'emit');

    component.backAuthLogin();

    expect(eventService.backAuthLogin.emit).toHaveBeenCalled();
  });

  it('should call logOut, clear localStorage, and navigate to /auth', () => {
    spyOn(localStorage, 'removeItem');
    spyOn(router, 'navigate');

    component.logOut();

    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('role');
    expect(router.navigate).toHaveBeenCalledWith(['/auth']);
  });

  it('should set showMenu, showBackOption, and showLogOut when user is authenticated', () => {
    // Make isAuthenticatedUser return true
    authService.isAuthenticatedUser.and.returnValue(true);

    // Re-initialize the component to trigger ngOnInit with the updated auth status
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.showMenu).toBeTrue();
    expect(component.showBackOption).toBeFalse();
    expect(component.showLogOut).toBeTrue();
  });

  it('should update showBackOption when showBackAuthLogin event is emitted', () => {
    eventService.showBackAuthLogin.emit();
    fixture.detectChanges();
    expect(component.showBackOption).toBeTrue();
  });
});
