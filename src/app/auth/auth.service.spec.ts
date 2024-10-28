/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../environments/environment.prod';
import { User } from './user';

describe('Service: Auth', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that no unmatched requests are outstanding.
  });

  it('should return a token when login with CLIENT role', () => {
    const mockUser: User = {
      email: 'clientuser',
      password: 'clientpass',
      role: 'CLIENT',
      token: '',
    };
    const mockTokenResponse = { token: 'client-token' };

    service.login(mockUser).subscribe((token) => {
      expect(token).toEqual('client-token');
    });

    // Expecting a POST request to the client token URL
    const req = httpMock.expectOne('/auth/clients/token');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUser);

    // Respond with mock token
    req.flush(mockTokenResponse);
  });

  it('should return a token when login with AGENT role', () => {
    const mockUser: User = {
      email: 'agentuser',
      password: 'agentpass',
      role: 'AGENT',
      token: '',
    };
    const mockTokenResponse = { token: 'agent-token' };

    service.login(mockUser).subscribe((token) => {
      expect(token).toEqual('agent-token');
    });

    // Expecting a POST request to the agent token URL
    const req = httpMock.expectOne('/auth/agents/token');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUser);

    // Respond with mock token
    req.flush(mockTokenResponse);
  });

  it('should throw an error for invalid role', () => {
    const mockUser: User = {
      email: 'invaliduser',
      password: 'invalidpass',
      role: 'INVALID_ROLE',
      token: '',
    };

    service.login(mockUser).subscribe(
      () => fail('Expected an error, but got a token'),
      (error) => {
        expect(error.name).toBe('RoleError');
        expect(error.message).toBe('El role ingresado no existe en el sistema');
      }
    );

    // Since the error is client-side, no HTTP request is expected.
  });
});
