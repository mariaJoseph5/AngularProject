import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AddTaskComponent} from './add-task/add-task.component';
import {ViewTasksComponent} from './view-tasks/view-tasks.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {StoreModule} from "@ngrx/store";
import {taskReducer} from "./ngrx-store/task.reducer";
import {EffectsModule} from "@ngrx/effects";
import {TaskEffects} from "./ngrx-store/task.effects";
import {DashboardDataComponent} from "./dashboard-data/dashboard-data.component";
import {ModalComponent} from './modal/modal.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AuthInterceptor} from "./interceptor/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AddTaskComponent,
    ViewTasksComponent,
    DashboardDataComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({tasks: taskReducer}),
    EffectsModule.forRoot([TaskEffects]),
    FontAwesomeModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
