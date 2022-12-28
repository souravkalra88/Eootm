
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {newTask} from '../../../models/addNewTaskModel';
import { NavigationEnd, Router } from '@angular/router';

import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { AddNewTaskService } from 'src/app/service/add-new-task.service';
import { GetAllTaskTypesService } from 'src/app/service/get-all-task-types.service';
import { GetTaskByTasktypesService } from 'src/app/service/get-task-by-tasktypes.service';
import { GetAllAdminsService } from 'src/app/service/get-all-usersservice';

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
  newTaskList:any[] = [];
  newTaskItem = new newTask();
  isButtonVisible:boolean = true;
  disableForm:boolean = false;

  
  @Output() closeClicked = new EventEmitter();
  @Output() saveClicked = new EventEmitter();
  adminsList:any[] = [];

  constructor(private getAllAdmins: GetAllAdminsService , private allTaskTypeData: GetAllTaskTypesService, private router: Router, private getTaskByType: GetTaskByTasktypesService, private getAllTaskType: GetAllTaskTypesService, private addNewTask: AddNewTaskService, private datePipe: DatePipe) {
    
  }
  ngOnInit(): void {
    this.newTaskItem = new newTask();
    this.newTaskList.push(this.newTaskItem)
    
     this.getAllAdmins.getAllAdmins().subscribe((data: any[])=>{
      this.adminsList = data
     // console.log(this.adminsList)
     })
    }
  done(){

    // api call to
     
    console.log("newTaskList",this.newTaskList)
     
      var body: any[] = [];
      // api call to post new tasks
      console.log(this.newTaskList);
      var bodyTemplate = {

        "tasktype": this.title.toLowerCase(),
        "owned_by": "",
        "CurrentUser": "",
        "due_duration": "",
        "task": "",
        "task_description": "",
        "created_at": this.datePipe.transform((new Date), 'dd/MM/yyyy; h:mm:ss') as string
      }
      this.newTaskList.forEach(function (val: newTask) {
        var bodyItem = bodyTemplate;
        bodyItem.owned_by = val.taskOwnedBy
        bodyItem.CurrentUser = environment.currentUser
        bodyItem.due_duration = val.dueDays+val.daysType[0]
        bodyItem.task = val.taskTitle
        bodyItem.task_description = val.taskDescription

        body.push(bodyItem)



      });
      console.log("all tasks added",body[0]);
      this.addNewTask.addNewTask(body).subscribe(data => {
        this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
          this.router.navigate(['/task-type/manage'], {
            state: { taskType: this.title }
          });
        })
        console.log(data);
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
