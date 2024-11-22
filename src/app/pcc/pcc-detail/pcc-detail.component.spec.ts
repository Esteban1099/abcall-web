import {
  waitForAsync,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { PccDetailComponent } from './pcc-detail.component';
import { PccService } from '../pcc.service';
import { Pcc } from '../pcc';
import { Consumer } from '../../consumer/consumer';
import { Company } from '../../company/company';
import { TranslateModule } from '@ngx-translate/core';

describe('PccDetailComponent', () => {
  let component: PccDetailComponent;
  let fixture: ComponentFixture<PccDetailComponent>;
  let pccService: jasmine.SpyObj<PccService>;

  const mockPcc: Pcc = {
    id: 'pcc-id',
    status: 'open',
    subject: 'Sample Subject',
    description: 'Sample Description',
    consumer: new Consumer(),
    company: new Company(),
    notifications: [
      {
        id: 'notif-id',
        reason: 'Sample Reason',
        status: 'sent',
        created_at: new Date().toISOString(),
      },
    ],
    create_at: new Date(),
  };

  beforeEach(waitForAsync(() => {
    const pccServiceSpy = jasmine.createSpyObj('PccService', ['getPccDetail']);
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        PccDetailComponent,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: PccService, useValue: pccServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => (key === 'id' ? '123' : null),
            }),
          },
        },
      ],
    }).compileComponents();

    pccService = TestBed.inject(PccService) as jasmine.SpyObj<PccService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PccDetailComponent);
    component = fixture.componentInstance;
    pccService.getPccDetail.and.returnValue(of(mockPcc)); // Default mock for service
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch PQR details on init if ID is present in route', () => {
    expect(pccService.getPccDetail).toHaveBeenCalledWith('123');
    expect(component.pcc).toEqual(mockPcc);
  });

  it('should log error if no ID is found in route', () => {
    spyOn(console, 'error');

    // Configure ActivatedRoute without an ID and instantiate a new component instance
    const routeWithoutId = {
      paramMap: of({ get: () => null }),
    };
    const newFixture = TestBed.createComponent(PccDetailComponent);
    const newComponent = newFixture.componentInstance;
    (newComponent as any).route = routeWithoutId; // Inject custom ActivatedRoute
    newFixture.detectChanges();

    newComponent.ngOnInit();
    expect(console.error).toHaveBeenCalledWith('No id found in route');
  });

  it('should log an error when fetchPQR fails', () => {
    spyOn(console, 'error');
    pccService.getPccDetail.and.returnValue(throwError('Error fetching PQR'));

    component.fetchPQR('123');
    expect(console.error).toHaveBeenCalledWith(
      'Error fetching PQR:',
      'Error fetching PQR'
    );
  });
});
