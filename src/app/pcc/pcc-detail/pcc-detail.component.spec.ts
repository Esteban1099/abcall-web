/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { PccDetailComponent } from './pcc-detail.component';

describe('PccDetailComponent', () => {
  let component: PccDetailComponent;
  let fixture: ComponentFixture<PccDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, PccDetailComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            // Provide any mock data or parameters required by ActivatedRoute
            paramMap: of({ get: (key: string) => 'mockValue' })
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PccDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
