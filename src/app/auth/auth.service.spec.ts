import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Auth } from './auth';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#loginClient', () => {
    it('should send a POST request to /api/auth/clients/token and return the expected response', () => {
      const mockUser: Auth = { email: 'client@example.com', password: 'password123' };
      const mockResponse = { token: 'mock-client-token' };

      service.loginClient(mockUser).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpTestingController.expectOne('/api/auth/clients/token');
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(mockUser);
      req.flush(mockResponse);
    });
  });

  describe('#loginAgent', () => {
    it('should send a POST request to /api/auth/agents/token and return the expected response', () => {
      const mockUser: Auth = { email: 'agent@example.com', password: 'password123' };
      const mockResponse = { token: 'mock-agent-token' };

      service.loginAgent(mockUser).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpTestingController.expectOne('/api/auth/agents/token');
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(mockUser);
      req.flush(mockResponse);
    });
  });

  describe('#isAuthenticatedUser', () => {
    it('should return true if a token exists in localStorage', () => {
      spyOn(localStorage, 'getItem').and.returnValue('mock-token');
      expect(service.isAuthenticatedUser()).toBeTrue();
    });

    it('should return false if no token exists in localStorage', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      expect(service.isAuthenticatedUser()).toBeFalse();
    });
  });

  describe('#getUserRole', () => {
    it('should return the role from sessionStorage if it exists', () => {
      spyOn(sessionStorage, 'getItem').and.returnValue('CLIENT');
      expect(service.getUserRole()).toBe('CLIENT');
    });

    it('should return null if no role exists in sessionStorage', () => {
      spyOn(sessionStorage, 'getItem').and.returnValue(null);
      expect(service.getUserRole()).toBeNull();
    });
  });
});
