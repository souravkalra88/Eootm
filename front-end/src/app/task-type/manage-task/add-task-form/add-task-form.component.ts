
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {newTask} from '../../../models/addNewTaskModel';
import { NavigationEnd, Router } from '@angular/router';

import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { AddNewTaskService } from 'src/app/service/add-new-task.service';
import { GetAllTaskTypesService } from 'src/app/service/get-all-task-types.service';
import { GetTaskByTasktypesService } from 'src/app/service/get-task-by-tasktypes.service';
import { GetAllUsersService } from 'src/app/service/get-all-usersservice';


@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.css']
})
export class AddTaskFormComponent  implements OnInit {
 @Input()
  title!: string; 
  displayStyleAddTask:any = "block"; 
  userForm!: NgForm; 
  someSubscription: any;
  newTaskList:newTask[] = [];
  
  newTaskItem = new newTask();
  isButtonVisible:boolean = true;
  disableForm:boolean = false;

  
  @Output() closeClicked = new EventEmitter();
  @Output() saveClicked = new EventEmitter();
  adminsList:any[] = [];

  constructor(private getAllUsers: GetAllUsersService , private allTaskTypeData: GetAllTaskTypesService, private router: Router, private getTaskByType: GetTaskByTasktypesService, private getAllTaskType: GetAllTaskTypesService, private addNewTask: AddNewTaskService, private datePipe: DatePipe) {
  
    
  }
  ngOnInit(): void {
    this.newTaskItem = new newTask();
    this.newTaskList.push(this.newTaskItem)
    

     this.getAllUsers.getAllUsers().subscribe((responsedata: any[])=>{
      responsedata.forEach((val: any) => {
        if (val['custom:role'] === 'admin') {
          this.adminsList.push(val);
        }
      })
     
     })
    }
  done(){

    
      var body: any[] = [];
      
      var title= this.title.toLowerCase()
      var date=this.datePipe.transform((new Date), 'dd/MM/yyyy; h:mm:ss') as string
      this.newTaskList.forEach(function (val: newTask) {
        var bodyTemplate = {

          "tasktype": title,
          "owned_by": "",
          "CurrentUser": "",
          "due_duration": "",
          "task": "",
          "task_description": "",
          "created_at": date
        }
        var bodyItem = bodyTemplate;
        bodyItem.owned_by = val.taskOwnedBy
        bodyItem.CurrentUser = environment.currentUser
        bodyItem.due_duration = val.dueDays+val.daysType[0]
        bodyItem.task = val.taskTitle
        bodyItem.task_description = val.taskDescription
        body.push(bodyItem)

      });
    
      this.addNewTask.addNewTask(body).subscribe(data => {
        this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
          this.router.navigate(['/admin-view/task-type/manage'], {
            state: { taskType: this.title }
          });
        })
      
      })



    this.saveClicked.emit();
     this.closePopup()
  }

  closePopup(){
    this.displayStyleAddTask = "none";
    this.closeClicked.emit()

  }
addForm(){
  this.newTaskItem = new newTask();
  this.newTaskList.push(this.newTaskItem);
}
removeForm(idx: number){
  this.newTaskList.splice(idx,1)
}
refresh()
{
  

}
ngOnDestroy() {
  if (this.someSubscription) {
    this.someSubscription.unsubscribe();
  }
}

}
