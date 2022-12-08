import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.guard';
import { TaskTypeListComponent } from './task-type-list/task-type-list.component';



const routes: Routes = [
  { path: "", component: AuthComponent},
 { path: "home" ,component : HomeComponent, canActivate : [AuthGuard]},
{  path : "task-type", component: TaskTypeListComponent , canActivate: [AuthGuard] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule { }
