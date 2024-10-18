import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial data binding
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'abcall-web'`, () => {
    expect(component.title).toEqual('abcall-web');
  });

  it('should render title in a h1 tag', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('abcall-web');
  });
});
