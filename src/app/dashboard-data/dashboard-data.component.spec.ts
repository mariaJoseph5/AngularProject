import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DashboardDataComponent} from './dashboard-data.component';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {selectTasks} from '../ngrx-store/task.selector';
import {Category, Level, Status, Task} from '../ngrx-store/task.model';
import {Chart} from 'chart.js';

describe('DashboardDataComponent', () => {
  let component: DashboardDataComponent;
  let fixture: ComponentFixture<DashboardDataComponent>;
  let store: MockStore;
  let mockTasks: Task[];

  class MockChart {
    constructor(public ctx: any, public config: any) {
    }

    static register = jasmine.createSpy('register');
  }

  beforeAll(() => {
    (Chart as any) = MockChart;
  });

  beforeEach(async () => {
    mockTasks = [{
      task: 'Task 1',
      id:1,
      status: Status.IN_PROGRESS,
      startDate: Date.now() - (2 * 24 * 60 * 60 * 1000),
      timeTaken: 3,
      priority: Level.LOW,
      category: Category.HOME,
      description: 'Test 1'
    }, {
      task: 'Task 2',
      id:2,
      status: Status.COMPLETED,
      priority: Level.LOW,
      description: 'Test 2',
      startDate: Date.now() - (24 * 60 * 60 * 1000),
      timeTaken: 1,
      category: Category.WORK
    }, {task: 'Task 3', id: 3, status: Status.IN_PROGRESS,  priority: Level.LOW, startDate: Date.now(), timeTaken: 1, category: Category.WORK, description: 'Test 3'}];
    await TestBed.configureTestingModule({
      declarations: [DashboardDataComponent],
      providers: [provideMockStore({selectors: [{selector: selectTasks, value: mockTasks}]})]
    }).compileComponents();
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(DashboardDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set taskList from store selector', () => {
    expect(component.taskList.length).toBe(3);
    expect(component.taskList).toEqual(mockTasks);
  });

  it('should correctly filter todayList and tasksOverdueList', () => {
    const now = new Date();
    const epochDate = 24 * 60 * 60 * 1000;
    const epochStart = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)).getTime();
    const epochEnd = epochStart + epochDate;
    expect(component.todayList.some(t => t.task === 'Task 3')).toBeTrue();
    expect(component.todayList.some(t => t.task === 'Task 1')).toBeTrue();
    expect(component.todayList.some(t => t.task === 'Task 2')).toBeFalse();
    expect(component.tasksOverdueList.length).toBe(0);
  });

  it('should register chart.js and create charts in ngAfterViewInit', () => {
    component.pieCanvas = {nativeElement: {}};
    component.pieCanvasByCategory = {nativeElement: {}};
    spyOn(window as any, 'Chart').and.callThrough();
    component.ngAfterViewInit();
    expect(MockChart.register).toHaveBeenCalled();
    expect((window as any).Chart).toHaveBeenCalledTimes(2);
  });
});
