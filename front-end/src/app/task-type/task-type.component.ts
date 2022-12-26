import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { GetAllTaskTypesService } from '../service/get-all-task-types.service';
import { NgForm } from '@angular/forms';
import { AddTaskTypeService } from '../service/add-task-type.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { UpdateTaskTypeService } from '../service/update-tasktype.service';


@Component({
  selector: 'app-task-type',
  templateUrl: './task-type.component.html',
  styleUrls: ['./task-type.component.css']
})
export class TaskTypeComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  tasksTypeData:any; 
  ctasktypeid:string="";
    
  displayStyleAdd = "none";
  displayStyleEdit = "none";
  displayStyleAddTask = "none";
  formModal: any;
   
  ctasktitle:string = ""
  ctaskdesc:string = ""
  constructor(private allTaskTypeData: GetAllTaskTypesService, private addTaskType: AddTaskTypeService,private UpdateTaskType: UpdateTaskTypeService, private router: Router) { 
   
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
      
   
      const currentRoute = this.router.url;

      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentRoute]);  
      }); 
   

    
     
    });  

    // table refresh
   
  })  

  }
   this.closeAddNewTaskType()
   }

   
  EditTaskType(form: NgForm):void{
  console.log("inside updatetasktype");
  console.log(form.value)
  if(form.valid){
    let taskTypeName = form.value.editTaskTypeTitle
    
    let taskTypeDesc = form.value.editTaskTypeDesc
    let body = {
      "tasktype": taskTypeName,
      "description": taskTypeDesc,
      "sk":this.ctasktypeid
  } 
  
  // console.log(this.taskTypeName);
  console.log(this.ctasktypeid);
  // DataTables.Api.ajax.reload(); 
  this.UpdateTaskType.UpdateTaskType(body).subscribe((response: any )=> {
    console.log(response);
     

    this.allTaskTypeData.allTaskTypesData().subscribe((data: any)=>{
     
      this.tasksTypeData = data;
      console.log(this.tasksTypeData);
      const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]);  
    }); 

    
     
    });  

    // table refresh


    
 
  })  

  }
  
    this.closeEditTaskType(); 
    }


     
openAddNewTaskType(){
  this.displayStyleAdd = "block";
}

closeAddNewTaskType(){
  this.displayStyleAdd = "none";
  
}

openEditTaskType(taskType:any){
  this.ctasktitle  = taskType['tasktype']
  
  this.ctaskdesc  = taskType['description']
  this.ctasktypeid=taskType['sk'];
  this.displayStyleEdit = "block";
}

closeEditTaskType(){
  this.displayStyleEdit = "none";
}
manageTaskType(taskType:any){

  this.router.navigate(['/task-type/manage'],{
    state:{taskType:taskType.tasktype}
  });
}

  ngOnDestroy(): void {
    
    this.dtTrigger.unsubscribe();
  }

}