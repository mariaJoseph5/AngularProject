import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {AddTaskComponent} from './add-task.component';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Store, StoreModule} from '@ngrx/store';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {of, Subject} from 'rxjs';
import {TaskList} from '../ngrx-store/task.reducer';
import {selectTaskById, selectTasksLength} from '../ngrx-store/task.selector';
import {addTask, editTask} from '../ngrx-store/task.action';
import {Category, Level, Status} from '../ngrx-store/task.model';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let store: Store<TaskList>;
  let router: Router;
  let routerEventsSubject = new Subject<any>();
  let activatedRoute: any;
  beforeEach(async () => {
    activatedRoute = {paramMap: of({get: (key: string) => '1'})};
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, StoreModule.forRoot({})],
      declarations: [AddTaskComponent],
      providers: [FormBuilder, {
        provide: Router,
        useValue: {events: routerEventsSubject.asObservable(), navigate: jasmine.createSpy('navigate')}
      }, {provide: ActivatedRoute, useValue: activatedRoute}]
    }).compileComponents();
    store = TestBed.inject(Store);
    spyOn(store, 'select').and.callFake((selector: any) => {
      if (selector === selectTasksLength) {
        return of(5);
      }
      if (selector === selectTaskById('1')) {
        return of({
          id: '1',
          task: 'Test Task',
          timeTaken: 2,
          description: 'desc',
          priority: Level.MEDIUM,
          status: Status.IN_PROGRESS,
          startDate: Date.now(),
          category: Category.HOME
        });
      }
      return of();
    });
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should reset form on "add-task" route event', fakeAsync(() => {
    routerEventsSubject.next(new NavigationEnd(1, '/home/add-task', '/home/add-task'));
    tick();
    expect(component.taskForm.value.category).toBe(Category.HOME);
    expect(component.taskForm.value.priority).toBe(Level.LOW);
    expect(component.taskForm.value.status).toBe(Status.NOT_STARTED);
  }));

  it('should patch form values on "edit-task" route event', fakeAsync(() => {
    routerEventsSubject.next(new NavigationEnd(1, '/home/edit-task/1', '/home/edit-task/1'));
    tick();
    expect(component.isEditable).toBeTrue();
    expect(component.taskForm.value.task).toBe('Test Task');
    expect(component.taskForm.value.priority).toBe(Level.MEDIUM);
  }));

  it('should dispatch addTask action on submit when not editable', () => {
    component.isEditable = false;
    component.taskForm.patchValue({
      task: 'New Task',
      timeTaken: 1,
      description: 'desc',
      priority: Level.LOW,
      status: Status.NOT_STARTED,
      startDate: Date.now(),
      category: Category.HOME
    });
    component.submit();
    expect(store.dispatch).toHaveBeenCalledWith(addTask({
      task: {
        id: 1,
        task: 'Edit Task',
        timeTaken: 1,
        description: 'desc',
        priority: Level.LOW,
        status: Status.NOT_STARTED,
        startDate: Date.now(),
        category: Category.HOME
      }
    }));
  });

  it('should dispatch editTask action on submit when editable', () => {
    component.isEditable = true;
    component.taskForm.patchValue({
      id: '1',
      task: 'Edit Task',
      timeTaken: 1,
      description: 'desc',
      priority: Level.LOW,
      status: Status.NOT_STARTED,
      startDate: Date.now(),
      category: Category.HOME
    });
    component.submit();
    expect(store.dispatch).toHaveBeenCalledWith(editTask({
      id: 1,
      task: {
        id: 1,
        task: 'Edit Task',
        timeTaken: 1,
        description: 'desc',
        priority: Level.LOW,
        status: Status.NOT_STARTED,
        startDate: Date.now(),
        category: Category.HOME
      }
    }));
  });
});
