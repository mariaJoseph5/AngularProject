import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {AuthService} from '../auth/auth.service';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['login']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [FormBuilder, {provide: AuthService, useValue: authSpy}, {provide: Router, useValue: routerSpyObj}]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have form controls invalid initially', () => {
    expect(component.userForm.valid).toBeFalse();
  });

  it('should reset hasAttemptedLogin when form value changes', () => {
    component.hasAttemptedLogin = true;
    component.userForm.controls['userName'].setValue('newuser');
    expect(component.hasAttemptedLogin).toBeFalse();
  });

  it('should set hasAttemptedLogin true on login attempt', () => {
    component.userForm.controls['userName'].setValue('user');
    component.userForm.controls['password'].setValue('pass');
    authServiceSpy.login.and.returnValue(true);
    component.loginFunc();
    expect(component.hasAttemptedLogin).toBeTrue();
  });

  it('should call auth.login and navigate on successful login', () => {
    component.userForm.controls['userName'].setValue('user');
    component.userForm.controls['password'].setValue('pass');
    authServiceSpy.login.and.returnValue(true);
    component.loginFunc();
    expect(authServiceSpy.login).toHaveBeenCalledWith({userName: 'user', password: 'pass'});
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home/dashboard']);
    expect(component.isLoggedIn).toBeTrue();
  });

  it('should not navigate if login fails', () => {
    component.userForm.controls['userName'].setValue('user');
    component.userForm.controls['password'].setValue('wrongpass');
    authServiceSpy.login.and.returnValue(false);
    component.loginFunc();
    expect(authServiceSpy.login).toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
    expect(component.isLoggedIn).toBeFalse();
  });

  it('should not attempt login if form is invalid', () => {
    component.userForm.controls['userName'].setValue('');
    component.userForm.controls['password'].setValue('');
    component.loginFunc();
    expect(authServiceSpy.login).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
    expect(component.hasAttemptedLogin).toBeTrue();
  });
});

