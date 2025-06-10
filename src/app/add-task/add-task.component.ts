import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Category, Level, Status} from '../ngrx-store/task.model';
import {addTask, editTask} from "../ngrx-store/task.action";
import {TaskList} from "../ngrx-store/task.reducer";
import {Store} from "@ngrx/store";
import {selectTaskById, selectTasksLength} from "../ngrx-store/task.selector";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  displayMessageFlag = false;
  taskForm = this.fb.group({
    id: new FormControl(),
    task: new FormControl("", Validators.required),
    timeTaken: new FormControl(0, Validators.required),
    description: new FormControl("", Validators.required),
    priority: new FormControl("", Validators.required),
    status: new FormControl("", Validators.required),
    startDate: new FormControl((new Date()).getTime()),
    category: new FormControl("", Validators.required)
  });
  isEditable = false;
  length = 0;
  statusValues = Object.values(Status);
  priorities = Object.values(Level);
  categories = Object.values(Category);

  constructor(private router: Router, private fb: FormBuilder, private store: Store<TaskList>, private activatedRoute: ActivatedRoute) {
    this.store.select(selectTasksLength).subscribe((length) => {
      this.length = length;
    });
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      if (event.url.includes("add-task")) {
        this.taskForm.reset({
          startDate: (new Date()).getTime(),
          category: Category.HOME,
          priority: Level.LOW,
          status: Status.NOT_STARTED
        });
      } else if (event.url.includes("edit-task")) {
        this.activatedRoute.paramMap.subscribe(param => {
          const id = param.get('id');
          this.isEditable = true;
          this.store.select(selectTaskById(id)).subscribe((task: any) => {
            this.taskForm.patchValue(task);
          });
        });
      }
    });
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.isEditable) {
      let task: any = {...this.taskForm.value};
      this.store.dispatch(editTask({
        task: task, id: this.taskForm.value.id
      }));
    } else {
      let task: any = {...this.taskForm.value, id: String(this.length + 1)};
      this.store.dispatch(addTask({
        task: task
      }));
    }
    this.router.navigate(['/home/dashboard']);
  }
}
