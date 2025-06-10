import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {TaskList} from "../ngrx-store/task.reducer";
import {Observable} from "rxjs";
import {selectTasks} from "../ngrx-store/task.selector";
import {Task} from "../ngrx-store/task.model";
import {removeTask} from "../ngrx-store/task.action";

@Component({
  selector: 'view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.scss']
})
export class ViewTasksComponent implements OnInit {
  taskList$: Observable<Task[]>;
  isModalOpen = false;
  currentId = 0;
  message = "Are you sure you want to delete this task?";

  constructor(private store: Store<TaskList>, private router: Router) {
    this.taskList$ = this.store.pipe(select(selectTasks));
  }

  ngOnInit(): void {
  }

  openForm(event: any, id: any) {
    const buttonText = event.target as HTMLButtonElement;
    switch (buttonText.innerText) {
      case "Edit":
        this.router.navigate([`/home/edit-task/${id}`]);
        break;
      case "Delete": {
        this.isModalOpen = true;
        this.currentId = id;
      }
        break;
    }
  }

  closeModal(event: any) {
    this.isModalOpen = false;
    const buttonText = event.target as HTMLButtonElement;
    if (buttonText.innerText === "YES") {
      this.store.dispatch(removeTask({id: Number(this.currentId)}));
      this.router.navigate([`/home/dashboard`]);
    }
  }
}
