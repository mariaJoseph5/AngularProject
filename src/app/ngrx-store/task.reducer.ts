import {Task} from './task.model';
import {addTask, editTask, loadedTasks, removeTask} from "./task.action";

export interface TaskList {
  tasks: Task[];
  loaded: boolean;
}

export const initialState: TaskList = {
  tasks: [],
  loaded: false
};


export function taskReducer(state = initialState, action: any): TaskList {
  switch (action.type) {
    case addTask.type:
      return {
        ...state, tasks: [...state.tasks, action.task]
      };
    case editTask.type:
      return {
        ...state,
        tasks: state.tasks.map(task => (task.id === action.task.id ? action.task : task))
      };
    case removeTask.type:
      return {...state, tasks: state.tasks.filter(task => task.id !== action.id)};
    case loadedTasks.type:
      return {...state, tasks: action.tasks, loaded: action.loaded};
    default:
      return state;
  }
}
