import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HomeComponent} from './home.component';
import {NavigationEnd, Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {Subject} from 'rxjs';
import {RouteList} from '../ngrx-store/task.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let routerEvents$: Subject<any>;
  let routerSpy: jasmine.SpyObj<Router>;
  let authSpy: jasmine.SpyObj<AuthService>;
  beforeEach(async () => {
    routerEvents$ = new Subject<any>();
    routerSpy = jasmine.createSpyObj('Router', ['navigate'], {events: routerEvents$.asObservable()});
    authSpy = jasmine.createSpyObj('AuthService', ['logout']);
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{provide: Router, useValue: routerSpy}, {provide: AuthService, useValue: authSpy}]
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update selectedRoute to DASHBOARD on NavigationEnd event with /dashboard URL', () => {
    routerEvents$.next(new NavigationEnd(1, '/home/dashboard', '/home/dashboard'));
    expect(component.selectedRoute).toBe(RouteList.DASHBOARD);
  });

  it('should update selectedRoute to ADD_TASK on NavigationEnd event with /add-task URL', () => {
    routerEvents$.next(new NavigationEnd(1, '/home/add-task', '/home/add-task'));
    expect(component.selectedRoute).toBe(RouteList.ADD_TASK);
  });

  it('should update selectedRoute to VIEW_TASKS on NavigationEnd event with /view-tasks URL', () => {
    routerEvents$.next(new NavigationEnd(1, '/home/view-tasks', '/home/view-tasks'));
    expect(component.selectedRoute).toBe(RouteList.VIEW_TASKS);
  });

  it('should navigate to /home/dashboard when navigate() is called with dashboard button', () => {
    const fakeEvent = {target: {innerText: RouteList.DASHBOARD}} as unknown as Event;
    component.navigate(fakeEvent);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home/dashboard']);
  });

  it('should navigate to /home/add-task when navigate() is called with add-task button', () => {
    const fakeEvent = {target: {innerText: RouteList.ADD_TASK}} as unknown as Event;
    component.navigate(fakeEvent);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home/add-task']);
  });

  it('should navigate to /home/view-tasks when navigate() is called with view-tasks button', () => {
    const fakeEvent = {target: {innerText: RouteList.VIEW_TASKS}} as unknown as Event;
    component.navigate(fakeEvent);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['home/view-tasks']);
  });

  it('should call auth.logout and navigate to /login when navigate() is called with LOGOUT button', () => {
    const fakeEvent = {target: {innerText: RouteList.LOGOUT}} as unknown as Event;
    component.navigate(fakeEvent);
    expect(authSpy.logout).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
