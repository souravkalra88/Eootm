import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { GetAllTaskTypesService } from '../services/get-all-task-types.service';
import { NgForm } from '@angular/forms';

declare var window:any;

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
  formModal: any;

  constructor(private allTaskTypeData: GetAllTaskTypesService) { 
   
  }
  
  
  ngOnInit(): void {
    this.allTaskTypeData.allTaskTypesData().subscribe((data: any)=>{
      // console.log(data);
      this.tasksTypeData = data;
      this.dtTrigger.next(void 0);
    });

     

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    
  }
 
  addNewTaskType(form: NgForm):void{
  console.log(form.value.newTaskTypeTitle);
  console.log(form.value.newTaskTypeDesc);

  
  this.closeAddNewTaskType(); 
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
