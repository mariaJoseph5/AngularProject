import {TestBed} from '@angular/core/testing';
import {ResolverService} from './resolver.service';
import {MemoizedSelector} from '@ngrx/store';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {TaskList} from '../ngrx-store/task.reducer';
import {selectTasks} from '../ngrx-store/task.selector';
import {initializeTasks} from "../ngrx-store/task.action";

describe('ResolverService', () => {
  let resolver: ResolverService;
  let store: MockStore<TaskList>;
  let mockSelectTasks: MemoizedSelector<TaskList, any[]>;
  const dummyRoute = {} as ActivatedRouteSnapshot;
  const dummyState = {} as RouterStateSnapshot;
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [ResolverService, provideMockStore()]});
    resolver = TestBed.inject(ResolverService);
    store = TestBed.inject(MockStore);
    mockSelectTasks = store.overrideSelector(selectTasks, []);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should return true if tasks are already loaded', (done) => {
    const mockTasks = [{id: 1, name: 'Test Task'}];
    mockSelectTasks.setResult(mockTasks);
    store.refreshState();
    resolver.resolve(dummyRoute, dummyState).subscribe(result => {
      expect(result).toBeTrue();
      done();
    });
  });

  it('should dispatch initializeTasks if tasks are empty', (done) => {
    const dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    mockSelectTasks.setResult([]);
    store.refreshState();
    mockSelectTasks.setResult([]);
    store.refreshState();
    setTimeout(() => {
      mockSelectTasks.setResult([{id: 1, name: 'Task After Dispatch'}]);
      store.refreshState();
    }, 10);
    resolver.resolve(dummyRoute, dummyState).subscribe(result => {
      expect(dispatchSpy).toHaveBeenCalledWith(initializeTasks());
      expect(result).toBeTrue();
      done();
    });
  });


  it('should not dispatch initializeTasks if tasks already exist', (done) => {
    const dispatchSpy = spyOn(store, 'dispatch');
    mockSelectTasks.setResult([{id: 2, name: 'Existing Task'}]);
    store.refreshState();
    resolver.resolve(dummyRoute, dummyState).subscribe(result => {
      expect(dispatchSpy).not.toHaveBeenCalled();
      expect(result).toBeTrue();
      done();
    });
  });
});
