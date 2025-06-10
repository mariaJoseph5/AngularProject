import {TestBed} from '@angular/core/testing';
import {AuthService} from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const authSecretKey = 'Bearer Token';
  const validUser = {userName: 'admin123', password: 'password@123'};
  const invalidUser = {userName: 'wrong', password: 'wrongpass'};
  const dummyToken = 'dummy-token';
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false when user is not authenticated initially', () => {
    expect(service.isAuthenticatedUser()).toBeFalse();
  });

  it('should login successfully with correct credentials', () => {
    const result = service.login(validUser);
    expect(result).toBeTrue();
    expect(localStorage.getItem(authSecretKey)).toBeTruthy();
    expect(service.isAuthenticatedUser()).toBeTrue();
  });

  it('should fail login with incorrect credentials', () => {
    const result = service.login(invalidUser);
    expect(result).toBeFalse();
    expect(localStorage.getItem(authSecretKey)).toBeNull();
    expect(service.isAuthenticatedUser()).toBeFalse();
  });

  it('should return the correct auth secret key', () => {
    expect(service.getAuthSecretKey()).toBe(authSecretKey);
  });

  it('should correctly set isAuthenticated when token is present in localStorage', () => {
    localStorage.setItem(authSecretKey, dummyToken);
    const newService = new AuthService();
    expect(newService.isAuthenticatedUser()).toBeTrue();
  });

  it('should logout correctly', () => {
    service.login(validUser);
    service.logout();
    expect(service.isAuthenticatedUser()).toBeFalse();
    expect(localStorage.getItem(authSecretKey)).toBeNull();
  });
});

