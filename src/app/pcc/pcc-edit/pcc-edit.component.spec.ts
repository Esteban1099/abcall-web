/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PccEditComponent } from './pcc-edit.component';

describe('PccEditComponent', () => {
  let component: PccEditComponent;
  let fixture: ComponentFixture<PccEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PccEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PccEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
