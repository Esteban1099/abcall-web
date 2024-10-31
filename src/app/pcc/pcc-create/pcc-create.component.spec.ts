import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PccCreateComponent } from './pcc-create.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PccService } from '../pcc.service';
import { ToastService } from '../../commons/toast.service';
import { EventService } from '../../commons/event.service';
import { of } from 'rxjs';
import { Pcc } from '../pcc';
import { SimplifiedConsumer } from '../../consumer/consumer';

describe('PccCreateComponent', () => {
  let component: PccCreateComponent;
  let fixture: ComponentFixture<PccCreateComponent>;
  let pccService: jasmine.SpyObj<PccService>;
  let toastService: jasmine.SpyObj<ToastService>;
  let eventService: EventService;

  beforeEach(waitForAsync(() => {
    pccService = jasmine.createSpyObj('PccService', ['createPcc']);
    toastService = jasmine.createSpyObj('ToastService', ['showSuccess']);
    eventService = new EventService();

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, PccCreateComponent],
      providers: [
        FormBuilder,
        { provide: PccService, useValue: pccService },
        { provide: ToastService, useValue: toastService },
        { provide: EventService, useValue: eventService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PccCreateComponent);
    component = fixture.componentInstance;

    // Simulamos el input de consumer
    component.consumer = {
      id: 'consumer123',
      identification_type: 'passport',
      identification_number: '12345678',
      name: 'John Doe',
      email: 'johndoe@example.com',
      contact_number: '555-555-5555',
      address: '123 Main St',
      companies: [],
      pccs: [],
    };
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.pccForm).toBeDefined();
    expect(component.pccForm.get('company')?.value).toBe('');
    expect(component.pccForm.get('subject')?.value).toBe('');
    expect(component.pccForm.get('description')?.value).toBe('');
    expect(component.pccForm.valid).toBeFalse(); // Formulario debe ser inválido al inicio
  });

  it('should call createPcc and show success message on successful creation', () => {
    const mockConsumer: SimplifiedConsumer = {
      id: 'consumer123',
      identification_type: 'CC',
      identification_number: '123456789',
    };

    const mockPcc: Pcc = {
      id: 'pcc123',
      subject: 'Test Subject',
      description: 'Test Description',
      status: 'pending',
      consumer: mockConsumer,
    };

    component.pccForm.setValue({
      company: 'company123',
      subject: 'Test Subject',
      description:
        'This is a valid description that meets the requirements for length.',
    });

    pccService.createPcc.and.returnValue(of(mockPcc));

    component.createPcc(component.pccForm.value);

    expect(toastService.showSuccess).toHaveBeenCalledWith(
      'La PQR ha sido creada exitosamente'
    );
    expect(component.pccForm.get('subject')?.value).toBe(null); // Formulario se debería resetear
    expect(component.pccForm.get('description')?.value).toBe(null); // Formulario se debería resetear
  });

  it('should emit clearConsumer event when clearConsumer is called', () => {
    spyOn(eventService.clearConsumer, 'emit');

    component.clearConsumer();

    expect(eventService.clearConsumer.emit).toHaveBeenCalled();
  });
});
