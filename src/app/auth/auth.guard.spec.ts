import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {AuthGuard} from './auth.guard';
import {AuthService} from './auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticatedUser']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [AuthGuard, {
        provide: AuthService,
        useValue: authServiceSpy
      }, {provide: Router, useValue: routerSpy}]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should allow activation if user is authenticated', () => {
    authServiceSpy.isAuthenticatedUser.and.returnValue(true);
    const canActivate = guard.canActivate();
    expect(canActivate).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should prevent activation and redirect if user is not authenticated', () => {
    authServiceSpy.isAuthenticatedUser.and.returnValue(false);
    const canActivate = guard.canActivate();
    expect(canActivate).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
