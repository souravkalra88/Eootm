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
  displayStyle = "none";
  formModal: any;

  constructor(private allTaskTypeData: GetAllTaskTypesService) { 
   
  }
  
  
  ngOnInit(): void {
    this.allTaskTypeData.allTaskTypesData().subscribe((data: any)=>{
      // console.log(data);
      this.tasksTypeData = data;
      this.dtTrigger.next(void 0);
    });

    
this.formModal = new window.bootstrap.Modal(
  document.getElementById("addtasktypeId")
)

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    
  }
 

openAddNewTaskType(){
  this.displayStyle = "block";
}

closeAddNewTaskType(){
  this.displayStyle = "none";
}

addNewTaskType(){
   
  this.closeAddNewTaskType(); 
}

  ngOnDestroy(): void {
    
    this.dtTrigger.unsubscribe();
  }

}
