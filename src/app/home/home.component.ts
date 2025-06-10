import {Component, OnInit,} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {NavigationEnd, Router} from "@angular/router";
import {RouteList} from '../ngrx-store/task.model';
import {filter} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selectedRoute = '';
  routeList = Object.values(RouteList);

  constructor(private auth: AuthService, private router: Router) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      if (event.url.includes("dashboard"))
        this.selectedRoute = RouteList.DASHBOARD;
      else if (event.url.includes("add-task"))
        this.selectedRoute = RouteList.ADD_TASK;
      else if (event.url.includes("view-tasks"))
        this.selectedRoute = RouteList.VIEW_TASKS;
    });
  }

  ngOnInit(): void {
  }

  navigate(event: Event) {
    const buttonText = event.target as HTMLButtonElement;
    switch (buttonText.innerText) {
      case RouteList.DASHBOARD:
        this.router.navigate(['/home/dashboard']);
        break;
      case RouteList.ADD_TASK:
        this.router.navigate(['/home/add-task']);
        break;
      case RouteList.VIEW_TASKS:
        this.router.navigate(['home/view-tasks']);
        break;
      case RouteList.LOGOUT: {
        this.auth.logout();
        this.router.navigate(['/login']);
      }
        break;
    }
  }
}
