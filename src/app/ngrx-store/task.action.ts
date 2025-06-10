import {createAction, props} from "@ngrx/store";
import {Task} from './task.model';

export const initializeTasks = createAction(
  '[Initialize] Initialize Task Items', props<{ tasks: Task[], loaded: boolean }>
);

export const loadedTasks = createAction(
  '[Loaded] Loaded Task Items', props<{ tasks: Task[], loaded: boolean }>
);

export const addTask = createAction(
  '[Post] Add Task',
  props<{ task: Task }>()
);

export const removeTask = createAction(
  '[Delete] Remove Task',
  props<{ id: string | number }>()
);

export const editTask = createAction(
  '[Edit] Edit Task',
  props<{ task: Task, id: string | number }>()
);
