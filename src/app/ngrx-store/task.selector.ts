import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TaskList} from './task.reducer';

export const selectTaskList = createFeatureSelector<TaskList>('tasks');
export const selectTasks = createSelector(
  selectTaskList,
  (state: TaskList) => state.tasks
);
export const selectTaskById = (id: string | number | null) =>
  createSelector(selectTasks, tasks => tasks.find(task => task.id == id));

export const selectTasksLength = createSelector(
  selectTaskList,
  (state: TaskList) => state.tasks.length
);
