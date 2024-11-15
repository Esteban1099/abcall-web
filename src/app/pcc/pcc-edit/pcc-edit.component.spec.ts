// pcc-edit.component.spec.ts

import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { PccEditComponent } from './pcc-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { PccService } from '../pcc.service';
import { Pcc } from '../pcc';
import { ToastService } from '../../commons/toast.service';
import { EventService } from '../../commons/event.service';
import { DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Consumer } from '../../consumer/consumer';

@Component({
  template: ''
})
class DummyComponent {}

describe('PccEditComponent', () => {
  let component: PccEditComponent;
  let fixture: ComponentFixture<PccEditComponent>;
  let pccService: PccService;
  let toastService: ToastService;
  let eventService: EventService;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        PccEditComponent,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'pcc-list', component: DummyComponent },
          { path: 'pcc-edit/:id', component: DummyComponent }, // Añade esta ruta si es necesaria
        ]),
      ],
      declarations: [DummyComponent],
      providers: [
        PccService,
        ToastService,
        EventService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'test-pcc-id' // Simular el ID de la PQR
              }
            }
          }
        },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PccEditComponent);
    component = fixture.componentInstance;
    pccService = TestBed.inject(PccService);
    toastService = TestBed.inject(ToastService);
    eventService = TestBed.inject(EventService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    httpMock = TestBed.inject(HttpTestingController);

    // Simular la PQR obtenida desde el servicio
    const mockPcc: Pcc = {
      id: 'test-pcc-id',
      subject: 'Test Subject',
      description: 'Test Description',
      company: {
        id: 'company-id',
        name: 'Test Company',
      },
      status: 'En revisión',
      consumer: new Consumer(),
      create_at: new Date(),
      notifications: [],
      // Añade otras propiedades si es necesario
    };

    spyOn(pccService, 'getPccDetail').and.returnValue(of(mockPcc));

    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch PQR on init', () => {
    expect(pccService.getPccDetail).toHaveBeenCalledWith('test-pcc-id');
    expect(component.pcc).toBeDefined();
    expect(component.pcc.id).toBe('test-pcc-id');
  });

  it('should have invalid form when empty', () => {
    expect(component.pccEditForm.valid).toBeFalsy();
  });

  it('should validate reason field', () => {
    const reasonControl = component.pccEditForm.controls['reason'];
    expect(reasonControl.valid).toBeFalsy();

    reasonControl.setValue('');
    expect(reasonControl.hasError('required')).toBeTruthy();

    reasonControl.setValue('Short');
    expect(reasonControl.hasError('minlength')).toBeTruthy();

    const longText = 'a'.repeat(1001);
    reasonControl.setValue(longText);
    expect(reasonControl.hasError('maxlength')).toBeTruthy();

    reasonControl.setValue('Valid reason text');
    expect(reasonControl.valid).toBeTruthy();
  });

  it('should validate status field', () => {
    const statusControl = component.pccEditForm.controls['status'];
    expect(statusControl.valid).toBeFalsy();

    statusControl.setValue('');
    expect(statusControl.hasError('required')).toBeTruthy();

    statusControl.setValue('En revisión');
    expect(statusControl.valid).toBeTruthy();
  });

  it('should enable submit button when form is valid', () => {
    component.pccEditForm.controls['reason'].setValue('Valid reason text');
    component.pccEditForm.controls['status'].setValue('En revisión');
    fixture.detectChanges();

    const submitButton: HTMLButtonElement = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(submitButton.disabled).toBeFalsy();
  });

  it('should disable submit button when form is invalid', () => {
    component.pccEditForm.controls['reason'].setValue('');
    component.pccEditForm.controls['status'].setValue('');
    fixture.detectChanges();

    const submitButton: HTMLButtonElement = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(submitButton.disabled).toBeTruthy();
  });

  it('should call onSubmit when form is submitted', () => {
    spyOn(component, 'onSubmit');
    component.pccEditForm.controls['reason'].setValue('Valid reason text');
    component.pccEditForm.controls['status'].setValue('En revisión');
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should update PQR on valid form submission', fakeAsync(() => {
    spyOn(pccService, 'updatePcc').and.returnValue(of({}));
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    spyOn(toastService, 'showSuccess');

    component.pccEditForm.controls['reason'].setValue('Valid reason text');
    component.pccEditForm.controls['status'].setValue('En revisión');
    component.onSubmit();

    expect(pccService.updatePcc).toHaveBeenCalledWith('test-pcc-id', {
      status: 'En revisión',
      reason: 'Valid reason text',
    });

    tick();

    expect(router.navigate).toHaveBeenCalledWith(['/pcc-edit', 'test-pcc-id']);
    expect(component.pccEditForm.pristine).toBeTruthy();
    expect(component.pccEditForm.untouched).toBeTruthy();
    expect(toastService.showSuccess).toHaveBeenCalledWith('La PQR ha sido Editada exitosamente');
  }));

  it('should handle error on PQR update failure', fakeAsync(() => {
    spyOn(pccService, 'updatePcc').and.returnValue(throwError({}));
    spyOn(toastService, 'showError');

    component.pccEditForm.controls['reason'].setValue('Valid reason text');
    component.pccEditForm.controls['status'].setValue('En revisión');
    component.onSubmit();

    expect(pccService.updatePcc).toHaveBeenCalledWith('test-pcc-id', {
      status: 'En revisión',
      reason: 'Valid reason text',
    });

    tick();

    expect(toastService.showError).toHaveBeenCalledWith('Error al actualizar la PQR');
  }));

});
