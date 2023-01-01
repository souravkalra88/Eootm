
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetUserTasksService } from '../service/get-user-tasks.service';
import { environment } from 'src/environments/environment';
import { GetTasksByUserService } from '../service/get-tasks-by-user.service';


@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})

export class UserViewComponent implements OnInit {

  emp_id: string = (environment.emp_id) as string
  tasksList:any[] = []

  constructor(private getCurrentUserTasks :GetTasksByUserService ) {}

  ngOnInit(): void {
     

    this.getCurrentUserTasks.allTaskByTaskType(this.emp_id).subscribe(response => {
        this.tasksList = response
        console.log(this.tasksList)
    })
  }
  



      
  
}
