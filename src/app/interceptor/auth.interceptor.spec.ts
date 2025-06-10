import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthInterceptor} from './auth.interceptor';
import {AuthService} from '../auth/auth.service';

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['getAuthSecretKey']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: AuthService, useValue: authSpy}, {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }]
    });
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should add Authorization header with Bearer token when token exists', () => {
    const token = 'test-token';
    authServiceSpy.getAuthSecretKey.and.returnValue('authTokenKey');
    localStorage.setItem('authTokenKey', token);
    httpClient.get('/test').subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne('/test');
    expect(httpRequest.request.headers.has('Authorization')).toBeTrue();
    expect(httpRequest.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    httpRequest.flush({data: 'success'});
  });

  it('should NOT add Authorization header if token does not exist', () => {
    authServiceSpy.getAuthSecretKey.and.returnValue('authTokenKey');
    httpClient.get('/test').subscribe(response => {
      expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne('/test');
    expect(httpRequest.request.headers.has('Authorization')).toBeFalse();
    httpRequest.flush({data: 'success'});
  });
});
