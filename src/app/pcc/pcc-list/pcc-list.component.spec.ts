import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PccListComponent } from './pcc-list.component';
import { PccService } from '../pcc.service';
import { of, throwError } from 'rxjs';
import { Pcc } from '../pcc';
import { FormsModule } from '@angular/forms';

describe('PccListComponent', () => {
  let component: PccListComponent;
  let fixture: ComponentFixture<PccListComponent>;
  let pccService: jasmine.SpyObj<PccService>;

  // Mock Pcc list data
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
      },
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
      },
    },
    {
      id: 'PQR003',
      status: 'Completed',
      subject: 'Test Subject 3',
      description: 'Test Description 3',
      consumer: {
        id: 'consumer3',
        identification_type: 'CE',
        identification_number: '987654',
      },
    },
  ];

  beforeEach(waitForAsync(() => {
    const pccServiceSpy = jasmine.createSpyObj('PccService', ['getPccList']);

    TestBed.configureTestingModule({
      imports: [FormsModule, PccListComponent], // PccListComponent is standalone
      providers: [{ provide: PccService, useValue: pccServiceSpy }],
    }).compileComponents();

    pccService = TestBed.inject(PccService) as jasmine.SpyObj<PccService>;

    // Set up the mock getPccList to return an observable with empty data by default
    pccService.getPccList.and.returnValue(of([]));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PccListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('#fetchPQRs', () => {
    it('should populate pccList and filteredPccs with data from service', () => {
      pccService.getPccList.and.returnValue(of(mockPccList));

      component.fetchPQRs();
      fixture.detectChanges();

      expect(component.pccList).toEqual(mockPccList);
      expect(component.filteredPccs).toEqual(mockPccList);
    });

    it('should handle error when fetching PQR list fails', () => {
      const errorResponse = new Error('Failed to fetch PQR list');

      // Ensure getPccList returns an observable that throws an error
      pccService.getPccList.and.returnValue(throwError(() => errorResponse));

      spyOn(console, 'error'); // Spy on console.error to verify error handling
      component.fetchPQRs();

      expect(console.error).toHaveBeenCalledWith(
        'Error fetching PQR list:',
        errorResponse
      );
      expect(component.pccList).toEqual([]); // Ensure no data is populated on error
      expect(component.filteredPccs).toEqual([]);
    });
  });

  describe('#applyFilter', () => {
    beforeEach(() => {
      component.pccList = mockPccList;
      component.filteredPccs = mockPccList;
    });

    it('should show all Pccs when searchTerm is empty', () => {
      component.searchTerm = '';
      component.applyFilter();
      expect(component.filteredPccs).toEqual(mockPccList);
    });

    it('should filter Pccs by id based on searchTerm', () => {
      component.searchTerm = 'PQR001';
      component.applyFilter();
      expect(component.filteredPccs.length).toBe(1);
      expect(component.filteredPccs[0].id).toBe('PQR001');
    });

    it('should be case insensitive when filtering by searchTerm', () => {
      component.searchTerm = 'pqr002';
      component.applyFilter();
      expect(component.filteredPccs.length).toBe(1);
      expect(component.filteredPccs[0].id).toBe('PQR002');
    });

    it('should show no Pccs if searchTerm does not match any Pcc id', () => {
      component.searchTerm = 'NonExistingId';
      component.applyFilter();
      expect(component.filteredPccs.length).toBe(0);
    });
  });
});
