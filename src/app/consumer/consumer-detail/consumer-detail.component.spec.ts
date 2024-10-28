import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ConsumerDetailComponent } from './consumer-detail.component';
import { ConsumerService } from '../consumer.service';
import { EventService } from '../../commons/event.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Consumer } from '../consumer';
import { RouterTestingModule } from '@angular/router/testing';

describe('ConsumerDetailComponent', () => {
  let component: ConsumerDetailComponent;
  let fixture: ComponentFixture<ConsumerDetailComponent>;
  let consumerService: jasmine.SpyObj<ConsumerService>;
  let eventService: EventService;
  let router: Router;

  beforeEach(waitForAsync(() => {
    consumerService = jasmine.createSpyObj('ConsumerService', ['getConsumer']);
    eventService = new EventService();

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),  // Configuración de RouterTestingModule para evitar el error
        ConsumerDetailComponent
      ],
      providers: [
        { provide: ConsumerService, useValue: consumerService },
        { provide: EventService, useValue: eventService },
        FormBuilder
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerDetailComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router); // Inyecta el Router proporcionado por RouterTestingModule
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize actualRoute with the current URL', () => {
    component.actualRoute = router.url;
    expect(component.actualRoute).toBe('/');
  });

  it('should initialize the form with default values', () => {
    expect(component.consumerForm).toBeDefined();
    expect(component.consumerForm.get('identification_type')?.value).toBe('');
    expect(component.consumerForm.get('identification_number')?.value).toBe('');
    expect(component.consumerForm.valid).toBeFalse();
  });

  it('should call getConsumerDetails and reset the form on successful retrieval of consumer', () => {
    const mockConsumer: Consumer = {
      id: '1',
      identification_type: 'passport',
      identification_number: '12345678',
      name: 'John Doe',
      email: 'johndoe@example.com',
      contact_number: '555-555-5555',
      address: '123 Main St',
      companies: [],
      pccs: []
    };

    consumerService.getConsumer.and.returnValue(of(mockConsumer));

    component.getConsumerDetails(mockConsumer);

    expect(consumerService.getConsumer).toHaveBeenCalledWith(mockConsumer);
    expect(component.consumer).toEqual(mockConsumer);
    expect(component.consumerForm.get('identification_type')?.value).toBe(null);
    expect(component.consumerForm.get('identification_number')?.value).toBe(null);
  });

  it('should clear the consumer when clearConsumer is called', () => {
    component.consumer = {
      id: '1',
      identification_type: 'passport',
      identification_number: '12345678',
      name: 'John Doe',
      email: 'johndoe@example.com',
      contact_number: '555-555-5555',
      address: '123 Main St',
      companies: [],
      pccs: []
    };

    component.clearConsumer();

    expect(component.consumer).toBeUndefined();
  });

  it('should handle clearConsumer event from EventService', () => {
    spyOn(component, 'clearConsumer');

    // Emite el evento clearConsumer
    eventService.clearConsumer.emit();
    fixture.detectChanges();

    expect(component.clearConsumer).toHaveBeenCalled();
  });
});
