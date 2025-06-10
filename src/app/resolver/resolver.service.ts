import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {filter, map, Observable, take, tap} from "rxjs";
import {select, Store} from "@ngrx/store";
import {TaskList} from "../ngrx-store/task.reducer";
import {selectTasks} from "../ngrx-store/task.selector";
import {initializeTasks} from "../ngrx-store/task.action";

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<boolean> {
  constructor(private store: Store<TaskList>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store.pipe(select(selectTasks),
      tap(tasks => {
        if (!tasks.length) {
          this.store.dispatch(initializeTasks());
        }
      }),
      filter(tasks => tasks.length != 0),
      map(tasks => tasks),
      take(1)
    );
  }
}
