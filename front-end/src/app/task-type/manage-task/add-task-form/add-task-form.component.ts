import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {newTask} from '../../../models/addNewTaskModel';
import { NavigationEnd, Router } from '@angular/router';
import { GetAllAdminsService } from 'src/app/service/get-all-admins.service';
@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.css']
})
export class AddTaskFormComponent  implements OnInit {
   
  userForm!: NgForm; 
  someSubscription: any;
  newTaskList:any[] = [];
  newTaskItem = new newTask();
  isButtonVisible:boolean = true;
  disableForm:boolean = false;
  @Output() emitTasksList = new EventEmitter<any>();
  @Output() emitDone = new EventEmitter<boolean>();

  adminsList:any[] = [];

  constructor(private getAllAdmins: GetAllAdminsService , private router: Router) {
    
  }
  ngOnInit(): void {
    this.newTaskItem = new newTask();
    this.newTaskList.push(this.newTaskItem)

     this.getAllAdmins.getAllAdmins().subscribe((data)=>{
      this.adminsList = data
     // console.log(this.adminsList)
     })
      
    }
     
  done(){
    this.isButtonVisible = false;
    console.log(this.newTaskList)
    this.disableForm = true;
    this.emitDone.emit(true);
    this.emitTasksList.emit(this.newTaskList); 
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
