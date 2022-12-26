import { Component, OnInit, ViewChild } from '@angular/core';
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
import { AddTaskFormComponent } from './add-task-form/add-task-form.component';
@Component({
  selector: 'app-manage-task',
  templateUrl: './manage-task.component.html',
  styleUrls: ['./manage-task.component.css']
})
export class ManageTaskComponent implements OnInit {
  @ViewChild(AddTaskFormComponent)
  child!: AddTaskFormComponent;
  
  doneClicked = false
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  displayStyleAddTask = "none";
  title: string = ""
  eTasks: any
  taskTypes: any
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


    // console.log(this.title)


    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 15, 20],
    };
  }

  switchType(type: any) {
    console.log(type);

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/task-type/manage'], {
        state: { taskType: this.title }
      });
    });


  }
  // addNewTask(form: NgForm): void {
  //   if (form.valid) {
  //     console.log(form.value);
  //     console.log(form.value);


  //     this.closeAddNewTask();
  //   }

  // }
  receiveNewTasks(event: newTask[]) {
    this.newTasks = event

  }
  saveNewTasks() {
    if (this.doneClicked) {
      var body: any[] = [];
      // api call to post new tasks
      console.log(this.newTasks);
      var bodyTemplate = {

        "tasktype": this.title.toLowerCase(),
        "owned_by": "",
        "CurrentUser": "",
        "due_duration": "",
        "task": "",
        "task_description": "",
        "created_at": this.datePipe.transform((new Date), 'dd/MM/yyyy; h:mm:ss') as string
      }
      this.newTasks.forEach(function (val: newTask) {
        var bodyItem = bodyTemplate;
        bodyItem.owned_by = val.taskOwnedBy
        bodyItem.CurrentUser = environment.currentUser
        bodyItem.due_duration = val.taskDuration
        bodyItem.task = val.taskTitle
        bodyItem.task_description = val.taskDescription

        body.push(bodyItem)



      });
      console.log(body);
      this.addNewTask.addNewTask(body).subscribe(data => {
        this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
          this.router.navigate(['/task-type/manage'], {
            state: { taskType: this.title }
          });
        })
        console.log(data);
      })



      this.closeAddNewTask()
    }
    else { alert("Click done to finalize new tasks list") }


  }
  openAddNewTask() {
    this.displayStyleAddTask = "block";

  }

  closeAddNewTask() {
    this.displayStyleAddTask = "none";
 
  
  }


}
