import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastService],
    });
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#showError', () => {
    it('should add an error toast with the correct properties', () => {
      const errorMessage = 'An error occurred';
      service.showError(errorMessage);

      expect(service.toasts.length).toBe(1);
      expect(service.toasts[0].content.body).toBe(errorMessage);
      expect(service.toasts[0].options.classname).toBe('text-bg-danger');
    });
  });

  describe('#showSuccess', () => {
    it('should add a success toast with the correct properties', () => {
      const successMessage = 'Operation successful';
      service.showSuccess(successMessage);

      expect(service.toasts.length).toBe(1);
      expect(service.toasts[0].content.body).toBe(successMessage);
      expect(service.toasts[0].options.classname).toBe('text-bg-success');
    });
  });

  describe('#show', () => {
    it('should add a toast to the toasts array', () => {
      const content = { body: 'Custom message' };
      const options = { classname: 'custom-class' };
      (service as any).show(content, options); // Llamada directa al método privado show

      expect(service.toasts.length).toBe(1);
      expect(service.toasts[0].content).toEqual(content);
      expect(service.toasts[0].options).toEqual(options);
    });
  });

  describe('#remove', () => {
    it('should remove a specific toast from the toasts array', () => {
      const toast1 = { content: { body: 'Toast 1' }, options: { classname: 'text-bg-info' } };
      const toast2 = { content: { body: 'Toast 2' }, options: { classname: 'text-bg-warning' } };

      // Añadir toasts al arreglo manualmente
      service.toasts.push(toast1, toast2);

      service.remove(toast1);

      expect(service.toasts.length).toBe(1);
      expect(service.toasts).not.toContain(toast1);
      expect(service.toasts).toContain(toast2);
    });
  });
});
