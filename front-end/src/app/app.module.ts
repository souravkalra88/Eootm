import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from "angular-datatables";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'

import { DatePipe } from '@angular/common';

import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { TaskTypeComponent } from './task-type/task-type.component';
import { EmployeesComponent } from './employees/employees.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AdminsComponent } from './admins/admins.component';
import { ManageTaskComponent } from './task-type/manage-task/manage-task.component';
import { AddTaskFormComponent } from './task-type/manage-task/add-task-form/add-task-form.component';
import { AddtaskComponent } from './task-list/addtask/addtask.component';
import { ManageEmpTaskListComponent } from './task-list/manage-emp-task-list/manage-emp-task-list.component'; 

import { EmpEditTaskListComponent } from './task-list/emp-edit-task-list/emp-edit-task-list.component';
import { AdminsTableComponent } from './admins/admins-table/admins-table.component';
import { AddEmployeeComponent } from './employees/add-employee/add-employee.component';
import { AddAdminsComponent } from './admins/add-admins/add-admins.component';
import { FilterByStatusPipe } from './admins/filter-status-by-pipe';
import { UserViewComponent } from './user-view/user-view.component';
import { SidenavUserComponent } from './sidenav-user/sidenav-user.component';
import { HttpErrorInterceptor } from './http-error-interceptor';

@NgModule({
  declarations: [
    FilterByStatusPipe,
    AppComponent,
    AuthComponent,
    SidenavComponent,
    HeaderComponent,
    HomeComponent,
    TaskTypeComponent,
    EmployeesComponent,
    TaskListComponent,
    AdminsComponent,
    ManageTaskComponent,
    AddTaskFormComponent,
    AddtaskComponent,
    ManageEmpTaskListComponent,
    EmpEditTaskListComponent,
    AdminsTableComponent,
    AddEmployeeComponent,
    AddAdminsComponent,
    UserViewComponent,
    SidenavUserComponent,
    FilterByStatusPipe
    
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    DataTablesModule,
    HttpClientModule,
    
  ],
  providers: [AuthService , DatePipe , {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent ]
})
export class AppModule { }
