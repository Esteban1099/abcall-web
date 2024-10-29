import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ToastComponent } from './toast.component';
import { ToastService } from '../toast.service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let toastService: ToastService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NgbToastModule, ToastComponent],
      providers: [ToastService]
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastService);
    fixture.detectChanges();
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render toasts from ToastService', () => {
    // Añadir toasts de prueba en el servicio
    toastService.toasts = [
      { content: { body: 'Success message' }, options: { classname: 'text-bg-success' } },
      { content: { body: 'Error message' }, options: { classname: 'text-bg-danger' } }
    ];

    // Detectar cambios para que el componente renderice los toasts
    fixture.detectChanges();

    // Verificar que se rendericen los toasts en el HTML
    const toastElements = fixture.debugElement.queryAll(By.css('.toast'));
    expect(toastElements.length).toBe(2);

    expect(toastElements[0].nativeElement.textContent).toContain('Success message');
    expect(toastElements[0].nativeElement.classList).toContain('text-bg-success');

    expect(toastElements[1].nativeElement.textContent).toContain('Error message');
    expect(toastElements[1].nativeElement.classList).toContain('text-bg-danger');
  });

  it('should remove toast when close button is clicked', () => {
    const toastToRemove = { content: { body: 'Removable toast' }, options: { classname: 'text-bg-info' } };
    toastService.toasts = [toastToRemove];
    fixture.detectChanges();

    const closeButton = fixture.debugElement.query(By.css('.btn-close'));
    closeButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(toastService.toasts.length).toBe(0); // Toast debería eliminarse de la lista
    const toastElements = fixture.debugElement.queryAll(By.css('.toast'));
    expect(toastElements.length).toBe(0); // No debería haber toasts renderizados
  });
});
