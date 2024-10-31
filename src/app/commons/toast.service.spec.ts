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
    it('should add an error toast with text-bg-danger classname', () => {
      const errorMessage = 'An error occurred';
      service.showError(errorMessage);

      expect(service.toasts.length).toBe(1);
      expect(service.toasts[0].content.body).toBe(errorMessage);
      expect(service.toasts[0].options.classname).toBe('text-bg-danger');
    });
  });

  describe('#showSuccess', () => {
    it('should add a success toast with text-bg-success classname', () => {
      const successMessage = 'Operation successful';
      service.showSuccess(successMessage);

      expect(service.toasts.length).toBe(1);
      expect(service.toasts[0].content.body).toBe(successMessage);
      expect(service.toasts[0].options.classname).toBe('text-bg-success');
    });
  });

  describe('#show', () => {
    it('should add a custom toast to the toasts array with specified content and options', () => {
      const customContent = { body: 'Custom message' };
      const customOptions = { classname: 'custom-class' };
      (service as any).show(customContent, customOptions);

      expect(service.toasts.length).toBe(1);
      expect(service.toasts[0].content).toEqual(customContent);
      expect(service.toasts[0].options).toEqual(customOptions);
    });

    it('should add a custom toast with default options if no options are provided', () => {
      const customContent = { body: 'Custom message' };
      (service as any).show(customContent);

      expect(service.toasts.length).toBe(1);
      expect(service.toasts[0].content).toEqual(customContent);
      expect(service.toasts[0].options).toEqual({}); // Default options as an empty object
    });

    it('should add a custom toast with default content if no content is provided', () => {
      (service as any).show();

      expect(service.toasts.length).toBe(1);
      expect(service.toasts[0].content).toEqual({}); // Default content as an empty object
      expect(service.toasts[0].options).toEqual({});
    });
  });

  describe('#remove', () => {
    it('should remove a specific toast from the toasts array', () => {
      const toast1 = { content: { body: 'Toast 1' }, options: {} };
      const toast2 = { content: { body: 'Toast 2' }, options: {} };
      service.toasts = [toast1, toast2];

      service.remove(toast1);

      expect(service.toasts.length).toBe(1);
      expect(service.toasts[0]).toBe(toast2);
    });

    it('should not modify the toasts array if the toast is not found', () => {
      const toast1 = { content: { body: 'Toast 1' }, options: {} };
      const toast2 = { content: { body: 'Toast 2' }, options: {} };
      const nonExistentToast = {
        content: { body: 'Non-existent' },
        options: {},
      };
      service.toasts = [toast1, toast2];

      service.remove(nonExistentToast);

      expect(service.toasts.length).toBe(2);
      expect(service.toasts).toEqual([toast1, toast2]);
    });
  });
});
