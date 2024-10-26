import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsumerDetailComponent } from './consumer-detail.component';
import { ConsumerService } from '../consumer.service';
import { Router } from '@angular/router';
import { Consumer } from '../consumer';

describe('ConsumerDetailComponent', () => {
  let component: ConsumerDetailComponent;
  let fixture: ComponentFixture<ConsumerDetailComponent>;
  let consumerService: jasmine.SpyObj<ConsumerService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    // Create spies for the services
    consumerService = jasmine.createSpyObj('ConsumerService', [
      'getActualConsumerDetails',
    ]);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ConsumerDetailComponent],
      providers: [
        { provide: ConsumerService, useValue: consumerService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test component creation
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Test ngOnInit - token check and consumerDetails retrieval
  it('should navigate to /auth if no token in sessionStorage', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue(null); // Simulate no token
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/auth']); // Should navigate to /auth
  });

  // Test consumerDetails retrieval from service
  it('should retrieve consumer details from the service on init', () => {
    const mockConsumer: Consumer = {
      id: '123',
      identification_type: 'Pasaporte',
      identification_number: 'A1234567',
      name: 'John Doe',
      email: 'john.doe@example.com',
      contact_number: '555-5555',
      address: '123 Main St',
      companies: [{ id: '1', name: 'Company A' }],
      pccs: [],
    };

    // Simulate a token present
    spyOn(sessionStorage, 'getItem').and.returnValue(
      JSON.stringify({ token: 'mock-token' })
    );

    // Mock the consumerService call to return the mockConsumer
    consumerService.getActualConsumerDetails.and.returnValue(mockConsumer);

    component.ngOnInit();

    // Verify that consumerDetails are correctly set
    expect(component.consumerDetails).toEqual(mockConsumer);
  });

  // Test handling when no consumerDetails are available
  it('should log an error if no consumer details are available', () => {
    spyOn(console, 'error');
    spyOn(sessionStorage, 'getItem').and.returnValue(
      JSON.stringify({ token: 'mock-token' })
    );

    // Mock the service to return null (no consumer details)
    consumerService.getActualConsumerDetails.and.returnValue(null);

    component.ngOnInit();

    // Verify that the error is logged
    expect(console.error).toHaveBeenCalledWith('No consumer details found');
  });

  // Test goBack method
  it('should navigate to /consumer when goBack is called', () => {
    component.goBack();
    expect(router.navigate).toHaveBeenCalledWith(['/consumer']);
  });

  // Test goInit method
  it('should navigate to /consumer when goInit is called', () => {
    component.goInit();
    expect(router.navigate).toHaveBeenCalledWith(['/consumer']);
  });
});
