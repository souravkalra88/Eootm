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
import { ManageEmpTaskListComponent } from './task-list/manage-emp-task-list/manage-emp-task-list.component';
import { EmpEditTaskListComponent } from './task-list/emp-edit-task-list/emp-edit-task-list.component';
import { UserViewComponent } from './user-view/user-view.component';
import { AuthGuardUserGuard } from './auth/auth-guard-user.guard';
const routes: Routes = [
  { path: "", component: AuthComponent},
{ path: "admin-view/home" ,component : HomeComponent, canActivate : [AuthGuard]},
{ path: "admin-view/task-type" ,component : TaskTypeComponent, canActivate : [AuthGuard]},
{ path: "admin-view/employees" ,component : EmployeesComponent, canActivate : [AuthGuard]},
{ path: "admin-view/task-list" ,component : TaskListComponent, canActivate : [AuthGuard]},
{ path: "admin-view/task-list/manage" ,component : ManageEmpTaskListComponent,canActivate : [AuthGuard]},
{ path: "admin-view/task-list/edit" ,component : EmpEditTaskListComponent,canActivate : [AuthGuard]},
{ path: "admin-view/admins" ,component : AdminsComponent, canActivate : [AuthGuard]},
{ path: "admin-view/task-type/manage" ,component : ManageTaskComponent,canActivate : [AuthGuard]},
{path:"user-view",component : UserViewComponent, canActivate : [AuthGuardUserGuard]},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule { }
