import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { PqrCreateComponent } from './pqr-create.component';
import { ConsumerService } from '../../consumer/consumer.service';
import { PQRService } from '../pqr.service';
import { Consumer, Company } from '../../consumer/consumer';

describe('PqrCreateComponent', () => {
  let component: PqrCreateComponent;
  let fixture: ComponentFixture<PqrCreateComponent>;
  let consumerService: jasmine.SpyObj<ConsumerService>;
  let pqrService: jasmine.SpyObj<PQRService>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    consumerService = jasmine.createSpyObj('ConsumerService', [
      'getActualConsumerDetails',
    ]);
    pqrService = jasmine.createSpyObj('PQRService', ['createPQR']);
    toastrService = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [PqrCreateComponent],
      providers: [
        FormBuilder,
        { provide: ConsumerService, useValue: consumerService },
        { provide: PQRService, useValue: pqrService },
        { provide: ToastrService, useValue: toastrService },
        { provide: Router, useValue: router },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              consumer_id: 'consumer123',
              company_id: 'company123',
            }),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PqrCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test component creation
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Test form initialization and route parameter handling
  it('should initialize form and load route parameters', () => {
    expect(component.pqrForm).toBeDefined();
    expect(component.pqrForm.get('subject')?.value).toBe('');
    expect(component.pqrForm.get('description')?.value).toBe('');
    expect(component.consumerId).toBe('consumer123');
    expect(component.companyId).toBe('company123');
  });

  // Test ngOnInit: Consumer details loading and token check
  it('should load consumer details and check token', () => {
    const mockConsumer: Consumer = {
      id: 'consumer123',
      identification_type: 'CC',
      identification_number: '123456',
      name: 'John Doe',
      email: 'johndoe@example.com',
      contact_number: '555-5555',
      address: '123 Main St',
      companies: [],
      pccs: [],
    };

    spyOn(sessionStorage, 'getItem').and.returnValue(
      JSON.stringify({ token: 'mock-token' })
    );
    consumerService.getActualConsumerDetails.and.returnValue(mockConsumer);

    component.ngOnInit();

    expect(component.consumerDetails).toEqual(mockConsumer);
    expect(router.navigate).not.toHaveBeenCalled(); // Should not navigate if token is present
  });

  // Test submitPQR: Invalid form
  it('should show an error if the form is invalid', () => {
    component.pqrForm.patchValue({
      subject: '',
      description: '',
    });

    component.submitPQR('company123', 'consumer123');

    expect(toastrService.error).toHaveBeenCalledWith(
      'Error',
      'Please fill in all fields. Consumer Id isconsumer123Company Id iscompany123'
    );
    expect(pqrService.createPQR).not.toHaveBeenCalled();
  });

  // Test navigation methods
  it('should navigate to /consumer when goBack is called', () => {
    component.goBack();
    expect(router.navigate).toHaveBeenCalledWith(['/consumer']);
  });

  it('should navigate to /consumer when goInit is called', () => {
    component.goInit();
    expect(router.navigate).toHaveBeenCalledWith(['/consumer']);
  });
});
