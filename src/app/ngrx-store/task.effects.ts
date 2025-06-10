import {Injectable} from '@angular/core';
import {catchError, map, mergeMap, of} from "rxjs";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {addTask, editTask, initializeTasks, removeTask} from "./task.action";
import {HttpClient} from "@angular/common/http";
import {TaskList} from "./task.reducer";

@Injectable()
export class TaskEffects {
  private url = "http://localhost:3000/tasks";

  constructor(private httpClient: HttpClient, private actions$: Actions) {
  }

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(ofType(initializeTasks),
      mergeMap(() => this.httpClient.get(`http://localhost:3000/tasks`)
        .pipe(map(response => ({
          type: '[Loaded] Loaded Task Items',
          tasks: response,
          loaded: true
        })), catchError(() => of({type: '[Initialize] Initialize Task Items Failed'}))))));

  addTasks$ = createEffect(() =>
    this.actions$.pipe(ofType(addTask),
      mergeMap((task) => this.httpClient.post<TaskList>(this.url, task.task)
        .pipe(map(response => ({
          type: '[Initialize] Initialize Task Items'
        })), catchError(() => of({type: '[Add] Add Task Items Failed'}))))));

  editTask$ = createEffect(() =>
    this.actions$.pipe(ofType(editTask),
      mergeMap((task) => this.httpClient.put<TaskList>(`${this.url}/${task.id}`, task.task)
        .pipe(map(response => ({
          type: '[Initialize] Initialize Task Items'
        })), catchError(() => of({type: '[Edit] Edit Task Items Failed'}))))));

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(ofType(removeTask),
      mergeMap((task) => this.httpClient.delete<TaskList>(`${this.url}/${task.id}`)
        .pipe(map(response => ({
          type: '[Initialize] Initialize Task Items'
        })), catchError(() => of({type: '[Delete] Remove Task Items Failed'}))))));
}
