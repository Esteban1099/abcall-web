import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PccListComponent } from './pcc-list.component';
import { PccService } from '../pcc.service';
import { of, throwError } from 'rxjs';
import { Pcc } from '../pcc';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../commons/internationalization/translation.service';

describe('PccListComponent', () => {
  let component: PccListComponent;
  let fixture: ComponentFixture<PccListComponent>;
  let pccService: jasmine.SpyObj<PccService>;
  let router: jasmine.SpyObj<Router>;
  let translationService: jasmine.SpyObj<TranslationService>;

  const mockPccList: Pcc[] = [
    {
      id: 'PQR001',
      status: 'Pending',
      subject: 'Test Subject 1',
      description: 'Test Description 1',
      consumer: {
        id: 'consumer1',
        identification_type: 'CC',
        identification_number: '123456',
        name: '',
        email: '',
        contact_number: '',
        address: '',
        companies: [],
        pccs: [],
      },
      company: {
        id: 'company1',
        name: 'Test Company',
      },
      notifications: [],
      create_at: new Date('2024-10-01'), // Oct-2024
    },
    {
      id: 'PQR002',
      status: 'In Progress',
      subject: 'Test Subject 2',
      description: 'Test Description 2',
      consumer: {
        id: 'consumer2',
        identification_type: 'CC',
        identification_number: '654321',
        name: '',
        email: '',
        contact_number: '',
        address: '',
        companies: [],
        pccs: [],
      },
      company: {
        id: 'company1',
        name: 'Test Company',
      },
      notifications: [],
      create_at: new Date('2024-11-15'), // Nov-2024
    },
  ];

  beforeEach(waitForAsync(() => {
    const pccServiceSpy = jasmine.createSpyObj('PccService', ['getPccList']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const translationServiceSpy = jasmine.createSpyObj('TranslationService', [
      'getCurrentLanguage',
    ]);

    TestBed.configureTestingModule({
      imports: [FormsModule, PccListComponent, TranslateModule.forRoot()],
      providers: [
        { provide: PccService, useValue: pccServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: TranslationService, useValue: translationServiceSpy },
        TranslateService,
      ],
    }).compileComponents();

    pccService = TestBed.inject(PccService) as jasmine.SpyObj<PccService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    translationService = TestBed.inject(
      TranslationService
    ) as jasmine.SpyObj<TranslationService>;

    pccService.getPccList.and.returnValue(of(mockPccList));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PccListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should call fetchPQRs on initialization', () => {
      spyOn(component, 'fetchPQRs');
      component.ngOnInit();
      expect(component.fetchPQRs).toHaveBeenCalled();
    });
  });

  describe('#fetchPQRs', () => {
    it('should update pccList and filteredPccs with data on success', () => {
      component.fetchPQRs();
      expect(component.pccList).toEqual(mockPccList);
      expect(component.filteredPccs).toEqual(mockPccList);
    });

    it('should update chart if role is CLIENT', () => {
      component.role = 'CLIENT';
      spyOn(component, 'updateChart');
      component.fetchPQRs();
      expect(component.updateChart).toHaveBeenCalled();
    });

    it('should handle error when PccService fails', () => {
      const error = new Error('Error fetching data');
      pccService.getPccList.and.returnValue(throwError(() => error));

      spyOn(console, 'error');
      component.fetchPQRs();

      expect(console.error).toHaveBeenCalledWith(
        'Error fetching PQR list:',
        error
      );
      expect(component.pccList).toEqual([]);
      expect(component.filteredPccs).toEqual([]);
    });
  });

  describe('#applyFilter', () => {
    beforeEach(() => {
      component.pccList = mockPccList;
      component.filteredPccs = mockPccList;
    });

    it('should filter by date range correctly', () => {
      component.fromDate = '2024-10-01';
      component.toDate = '2024-10-31';
      component.applyFilter();
      expect(component.filteredPccs.length).toBe(1);
      expect(component.filteredPccs[0].id).toBe('PQR001');
    });

    it('should filter by date range with only fromDate set', () => {
      component.fromDate = '2024-11-01';
      component.applyFilter();
      expect(component.filteredPccs.length).toBe(1);
      expect(component.filteredPccs[0].id).toBe('PQR002');
    });

    it('should filter by searchTerm', () => {
      component.searchTerm = 'PQR001';
      component.applyFilter();
      expect(component.filteredPccs.length).toBe(1);
      expect(component.filteredPccs[0].id).toBe('PQR001');
    });

    it('should call updateChart if role is CLIENT', () => {
      component.role = 'CLIENT';
      spyOn(component, 'updateChart');
      component.applyFilter();
      expect(component.updateChart).toHaveBeenCalled();
    });
  });

  describe('#updateChart', () => {
    it('should update chart data based on filtered PQRs', () => {
      translationService.getCurrentLanguage.and.returnValue('es-CO');

      // Set up mock data to trigger specific results
      component.filteredPccs = [
        {
          id: 'PQR001',
          status: 'Pending',
          subject: 'Test Subject 1',
          description: 'Test Description 1',
          consumer: {
            id: 'consumer1',
            identification_type: 'CC',
            identification_number: '123456',
            name: '',
            email: '',
            contact_number: '',
            address: '',
            companies: [],
            pccs: [],
          },
          company: { id: 'company1', name: 'Test Company' },
          notifications: [],
          create_at: new Date('2024-10-01'), // Oct-2024
        },
        {
          id: 'PQR002',
          status: 'Pending',
          subject: 'Test Subject 2',
          description: 'Test Description 2',
          consumer: {
            id: 'consumer2',
            identification_type: 'CC',
            identification_number: '654321',
            name: '',
            email: '',
            contact_number: '',
            address: '',
            companies: [],
            pccs: [],
          },
          company: { id: 'company1', name: 'Test Company' },
          notifications: [],
          create_at: new Date('2024-11-15'), // Nov-2024
        },
      ];

      component.updateChart();

      // Expect Oct-2024 and Nov-2024 labels with Pending status counts of 1 each
      expect(component.barChartData.labels).toEqual(['Oct-2024', 'Nov-2024']);
      expect(component.barChartData.datasets.length).toBe(1);
      expect(component.barChartData.datasets[0].data).toEqual([1, 1]);
    });
  });

  describe('#viewPccDetail', () => {
    it('should navigate to the correct detail page when viewPccDetail is called', () => {
      component.viewPccDetail('PQR001');
      expect(router.navigate).toHaveBeenCalledWith(['/pcc-detail', 'PQR001']);
    });
  });
});
