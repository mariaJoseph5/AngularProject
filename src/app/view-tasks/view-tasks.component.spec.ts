import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ViewTasksComponent} from './view-tasks.component';
import {Store} from '@ngrx/store';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {Router} from '@angular/router';
import {selectTasks} from '../ngrx-store/task.selector';
import {removeTask} from '../ngrx-store/task.action';
import {Category, Level, Status, Task} from '../ngrx-store/task.model';

describe('ViewTasksComponent', () => {
  let component: ViewTasksComponent;
  let fixture: ComponentFixture<ViewTasksComponent>;
  let store: MockStore;
  let router: jasmine.SpyObj<Router>;
  const mockTasks: Task[] = [{id: 1, task: 'Task 1', description: 'Test 1', status:Status.NOT_STARTED, priority:Level.LOW, timeTaken:0, category:Category.OTHER, startDate:0}, {
    id: 1, task: 'Task 2', description: 'Test 2', status:Status.NOT_STARTED, priority:Level.LOW, timeTaken:0, category:Category.OTHER, startDate:0
  }];
  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [ViewTasksComponent],
      providers: [provideMockStore({selectors: [{selector: selectTasks, value: mockTasks}]}), {
        provide: Router,
        useValue: routerSpy
      }]
    }).compileComponents();
    store = TestBed.inject(Store) as MockStore;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture = TestBed.createComponent(ViewTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should display all tasks from the store', () => {
    component.taskList$.subscribe(tasks => {
      expect(tasks.length).toBe(2);
    });
  });

  it('should navigate to edit page on Edit button click', () => {
    const event = {target: {innerText: 'Edit'}};
    component.openForm(event, 1);
    expect(router.navigate).toHaveBeenCalledWith(['/home/edit-task/1']);
  });

  it('should open modal and set currentId on Delete button click', () => {
    const event = {target: {innerText: 'Delete'}};
    component.openForm(event, 2);
    expect(component.isModalOpen).toBeTrue();
    expect(component.currentId).toBe(2);
  });

  it('should close modal and dispatch removeTask when YES is clicked', () => {
    spyOn(store, 'dispatch');
    const event = {target: {innerText: 'YES'}};
    component.currentId = 1;
    component.isModalOpen = true;
    component.closeModal(event);
    expect(component.isModalOpen).toBeFalse();
    expect(store.dispatch).toHaveBeenCalledWith(removeTask({id: 1}));
    expect(router.navigate).toHaveBeenCalledWith(['/home/dashboard']);
  });

  it('should close modal and not dispatch removeTask when NO is clicked', () => {
    spyOn(store, 'dispatch');
    const event = {target: {innerText: 'NO'}};
    component.isModalOpen = true;
    component.closeModal(event);
    expect(component.isModalOpen).toBeFalse();
    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
