import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { AppComponent } from './app.component';
import { AuthguardGuard } from './authguard.guard';
import { DisplayUsersComponent } from './display-users/display-users.component';
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [{
  path:"home",
  component: HomeComponent,
  canActivate: [AuthguardGuard]
},
{
  path:"login",
  component: LoginComponent
},{
  path: "display",
  component: DisplayUsersComponent
},{
  path: "add",
  component: AddUserComponent,
  canActivate: [AuthguardGuard]
},
// {
//   path:"",
//   component: AppComponent
// }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
