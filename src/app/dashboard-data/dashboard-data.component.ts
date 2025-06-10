import {Component, OnInit, ViewChild} from '@angular/core';
import {Category, Status, Task} from "../ngrx-store/task.model";
import {select, Store} from "@ngrx/store";
import {selectTasks} from "../ngrx-store/task.selector";
import {Chart, registerables} from "chart.js/auto";
import {TaskList} from "../ngrx-store/task.reducer";

@Component({
  selector: 'app-dashboard-data',
  templateUrl: './dashboard-data.component.html',
  styleUrls: ['./dashboard-data.component.scss']
})
export class DashboardDataComponent implements OnInit {
  taskList: Task[] = [];
  todayList: Task[] = [];
  tasksOverdueList: Task[] = [];
  @ViewChild('pieCanvas') pieCanvas: any;
  @ViewChild('pieCanvasByCategory') pieCanvasByCategory: any;

  constructor(private store: Store<TaskList>) {
    this.store.pipe(select(selectTasks)).subscribe((tasks) => {
      this.taskList = tasks;
      const now = new Date();
      let epochDate = 24 * 60 * 60 * 1000;
      let epochStart = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)).getTime();
      let epochEnd = epochStart + epochDate;
      this.todayList = tasks.filter((task) => task.status != Status.COMPLETED && ((task.startDate + task.timeTaken * epochDate) >= epochStart && epochEnd > (task.startDate + task.timeTaken * epochDate)));
      this.tasksOverdueList = tasks.filter((task) => task.status != Status.COMPLETED && (epochEnd > (task.startDate + task.timeTaken * epochDate)) && !this.todayList.includes(task));
    });
  }

  ngAfterViewInit() {
    Chart.register(...registerables);
    this.pieCanvas = new Chart(this.pieCanvas?.nativeElement, {
      type: 'bar',
      data: {
        labels: this.taskList.map(data => data.task),
        datasets: [{
          label: 'No of Days',
          data: this.taskList.map(data => data.timeTaken),
        }]
      }, options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.dataset.label ||
                  "";
                const value = context.parsed.y;
                return `${label}:${value}`
              }
            }
          },
        },
      }
    });
    let dataValueList: number[] = [];
    Object.values(Category).forEach((item) => {
      dataValueList.push(this.taskList.filter(data => data.category == item).reduce((acc, cur) => acc + cur.timeTaken, 0));
    });
    this.pieCanvasByCategory = new Chart(this.pieCanvasByCategory?.nativeElement, {
      type: 'pie',
      data: {
        labels: Object.values(Category),
        datasets: [{
          label: 'No of Days',
          data: dataValueList,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#A3E635", "#C9CBCF", "#3B3F99", "#A3E635"]
        }]
      }, options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.dataset.label ||
                  "";
                const value = context.parsed;
                return `${label}:${value}`
              }
            }
          },
        },
      }
    });
  }

  ngOnInit(): void {

  }

}
