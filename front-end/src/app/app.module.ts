import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from "angular-datatables";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http'

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




@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SidenavComponent,
    HeaderComponent,
    HomeComponent,
    TaskTypeComponent,
    EmployeesComponent,
    TaskListComponent,
    AdminsComponent,
    
    // HeaderComponent,
    // SidenavComponent,
    // TaskTypeListComponent,
    // EmployeeComponent,
    // TaskListComponent,
    // AdminsComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    DataTablesModule,
    HttpClientModule
    
  ],
  providers: [AuthService],
  bootstrap: [AppComponent ]
})
export class AppModule { }
