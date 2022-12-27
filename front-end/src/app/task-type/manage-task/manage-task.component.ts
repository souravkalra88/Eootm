import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { GetTaskByTasktypesService } from 'src/app/service/get-task-by-tasktypes.service';
import { GetAllTaskTypesService } from 'src/app/service/get-all-task-types.service'
import { newTask } from 'src/app/models/addNewTaskModel';
import { AddNewTaskService } from 'src/app/service/add-new-task.service';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { timer } from 'rxjs';
@Component({
  selector: 'app-manage-task',
  templateUrl: './manage-task.component.html',
  styleUrls: ['./manage-task.component.css']
})
export class ManageTaskComponent implements OnInit {
  doneClicked = false
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  displayStyleAddTask = "none";
  title: string = ""
  eTasks: any
  taskTypes: any
  openPopup: boolean = false
  url: string = ""
  newTasks: newTask[] = []
  constructor(private allTaskTypeData: GetAllTaskTypesService, private router: Router, private getTaskByType: GetTaskByTasktypesService, private getAllTaskType: GetAllTaskTypesService, private addNewTask: AddNewTaskService, private datePipe: DatePipe) {
    var tname = this.router.getCurrentNavigation()?.extras.state?.['taskType']

    this.title = tname

  }
  ngOnInit(): void {



    this.getAllTaskType.allTaskTypesData().subscribe((tdata: any) => {
      this.taskTypes = tdata;

      if (this.title === undefined)
        this.title = tdata[0].tasktype

      this.url += "/" + this.title.toLowerCase()
      this.getTaskByType.allTaskByTaskType(this.url).subscribe((data: any) => {

      this.eTasks = data;

      console.log(this.eTasks);  
         this.dtTrigger.next(void 0);
      });
    });


     


    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 15, 20],
    };
  }

  switchType(type: any) {
    
  
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/task-type/manage'], {
        state: { taskType: type }
      });
    });


  }
 


  openAddNewTask() {
    this.openPopup = true


  }
closeAddNewTask() {
  this.openPopup = false
}
saveAddNewTask(){
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/task-type/manage'], {
      state: { taskType: this.title }
    });
  });
}

}
