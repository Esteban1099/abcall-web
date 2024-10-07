/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AuthLoginComponent } from './auth-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';

describe('AuthLoginComponent', () => {
  let component: AuthLoginComponent;
  let fixture: ComponentFixture<AuthLoginComponent>;
  let debug: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ToastrModule.forRoot(), HttpClientModule],
      declarations: [AuthLoginComponent],
      providers: [AuthService],
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

  it('should have an dd element ', () => {
    const dd = debug.query(By.css('h1'));
    const content: HTMLElement = dd.nativeElement;
    expect(content.textContent).toEqual('ABCall');
  });
});
