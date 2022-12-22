import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { GetAllTaskTypesService } from '../service/get-all-task-types.service';
import { NgForm } from '@angular/forms';
import { AddTaskTypeService } from '../service/add-task-type.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';



@Component({
  selector: 'app-task-type',
  templateUrl: './task-type.component.html',
  styleUrls: ['./task-type.component.css']
})
export class TaskTypeComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  tasksTypeData:any; 
    
  displayStyleAdd = "none";
  displayStyleEdit = "none";
  displayStyleAddTask = "none";
  formModal: any;
   

  constructor(private allTaskTypeData: GetAllTaskTypesService, private addTaskType: AddTaskTypeService,private router: Router) { 
   
  }
  
  
  ngOnInit(): void {
    this.allTaskTypeData.allTaskTypesData().subscribe((data: any)=>{
      // console.log(data);
      this.tasksTypeData = data;
      console.log(this.tasksTypeData);
      this.dtTrigger.next(void 0);
    });

     

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5,10,15,20] ,
    };
    
  }
 
  addNewTask(form: NgForm):void{
    if(form.valid){
  console.log(form.value.newTaskTypeTitle);
  console.log(form.value.newTaskTypeDesc);


  this.closeAddNewTask();
    }
     
  }

   
  
openAddNewTask(){
  this.displayStyleAddTask = "block";
  this.displayStyleEdit = "none";
}

closeAddNewTask(){
  this.displayStyleAddTask = "none";
  this.displayStyleEdit = "block";
}

openEditTask(){
  this.displayStyleEdit = "block";
}

addNewTaskType(form: NgForm):void{
  if(form.valid){
    let taskTypeName = form.value.newTaskTypeTitle
  console.log(form.value.newTaskTypeTitle);
  console.log(form.value.newTaskTypeDesc);
    let taskTypeDesc = form.value.newTaskTypeDesc
    let body = {
      "tasktype": taskTypeName,
      "description": taskTypeDesc,
      "CurrentUser": environment.currentUser
  } 
  
  // DataTables.Api.ajax.reload(); 
  this.addTaskType.addTaskType(body).subscribe((response: any )=> {
    console.log(response);
     

    this.allTaskTypeData.allTaskTypesData().subscribe((data: any)=>{
     
      this.tasksTypeData = data;
      console.log(this.tasksTypeData);
    
     
    });  

    // table refresh


    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]);  
    }); 

 
  })  

 

  
  }
  
  this.closeAddNewTaskType()
   
   
  }

   
  editTaskType(form: NgForm):void{
     
  
    
    this.closeEditTaskType(); 
    }
  
openAddNewTaskType(){
  this.displayStyleAdd = "block";
}

closeAddNewTaskType(){
  this.displayStyleAdd = "none";
  
}

openEditTaskType(){
  this.displayStyleEdit = "block";
}

closeEditTaskType(){
  this.displayStyleEdit = "none";
}


  ngOnDestroy(): void {
    
    this.dtTrigger.unsubscribe();
  }

}
