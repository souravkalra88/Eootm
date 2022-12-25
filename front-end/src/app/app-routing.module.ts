import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.guard';

import { TaskTypeComponent } from './task-type/task-type.component';
import { EmployeesComponent } from './employees/employees.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AdminsComponent } from './admins/admins.component';
import { ManageTaskComponent } from './task-type/manage-task/manage-task.component';
import { AddTaskFormComponent } from './task-type/manage-task/add-task-form/add-task-form.component';
const routes: Routes = [
  { path: "", component: AuthComponent},
{ path: "home" ,component : HomeComponent, canActivate : [AuthGuard]},
{ path: "task-type" ,component : TaskTypeComponent, canActivate : [AuthGuard]},
{ path: "employees" ,component : EmployeesComponent, canActivate : [AuthGuard]},
{ path: "task-list" ,component : TaskListComponent, canActivate : [AuthGuard]},
{ path: "admins" ,component : AdminsComponent, canActivate : [AuthGuard]},
{ path: "task-type/manage" ,component : ManageTaskComponent,canActivate : [AuthGuard]},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule { }
