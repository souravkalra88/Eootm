
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetUserTasksService } from '../service/get-user-tasks.service';
import { environment } from 'src/environments/environment';
import { GetTasksByUserService } from '../service/get-tasks-by-user.service';
import { GetTasksStatusByEmployeeService } from '../service/get-tasks-status-by-employee.service';


@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})

export class UserViewComponent implements OnInit {
  loaded:boolean=false
  emp_id: string = (environment.emp_id) as string
  tasksList:any[] = []
  listStatus:any 
  length : number =0
  constructor(private statusByEmpId:GetTasksStatusByEmployeeService , private getCurrentUserTasks :GetTasksByUserService ) {}

  ngOnInit(): void {
     

    this.getCurrentUserTasks.allTaskByTaskType(this.emp_id).subscribe(response => {
        this.tasksList = response
      
        this.tasksList.sort((a:any , b:any) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime()) 
        this.loaded = true;
    })
    this.statusByEmpId.getTasksStatusByEmpId(this.emp_id).subscribe((data: any) =>{
      this.listStatus = data
      
      this.length  = Object.keys(this.listStatus).length
    })
  }
  



      
  
}
