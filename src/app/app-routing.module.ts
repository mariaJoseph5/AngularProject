import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddTaskComponent} from './add-task/add-task.component';
import {AuthGuard} from './auth/auth.guard';
import {ViewTasksComponent} from './view-tasks/view-tasks.component';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {ResolverService} from "./resolver/resolver.service";
import {DashboardDataComponent} from "./dashboard-data/dashboard-data.component";

const routes: Routes = [{
  path: "home",
  component: HomeComponent,
  canActivate: [AuthGuard],
  resolve: {
    taskData: ResolverService
  },
  children: [{
    path: "add-task",
    component: AddTaskComponent,
    canActivate: [AuthGuard]
  }, {
    path: "edit-task/:id",
    component: AddTaskComponent,
    canActivate: [AuthGuard]
  }, {
    path: "view-tasks",
    component: ViewTasksComponent
  },
    {
      path: "dashboard",
      component: DashboardDataComponent
    }]
},
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "",
    redirectTo: 'login',
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: "login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
