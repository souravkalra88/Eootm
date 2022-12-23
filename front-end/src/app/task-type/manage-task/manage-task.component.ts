import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { GetTaskByTasktypesService } from 'src/app/service/get-task-by-tasktypes.service';

@Component({
  selector: 'app-manage-task',
  templateUrl: './manage-task.component.html',
  styleUrls: ['./manage-task.component.css']
})
export class ManageTaskComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  displayStyleAddTask = "none";
  title :string= ""
  eTasks:any
  url:string = ""
  constructor(private router:Router,private getTaskByType: GetTaskByTasktypesService){
    var tname = this.router.getCurrentNavigation()?.extras.state?.['taskType'] 
    console.log(tname)
    this.title = tname == undefined ?  "Onboarding" : tname
  }
  ngOnInit(): void {
    this.title = this.title == "" ?  "Onboarding" : this.title
    console.log(this.title)

    this.url += "/" + this.title.toLowerCase() 
    this.getTaskByType.allTaskByTaskType(this.url).subscribe((data: any)=>{
      console.log(data);
      this.eTasks = data;
      console.log(this.eTasks);
      
      this.dtTrigger.next(void 0);
    });

    
   
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 15, 20],
    };
  }


  addNewTask(form: NgForm): void {
    if (form.valid) {
      console.log(form.value);
      console.log(form.value);


      this.closeAddNewTask();
    }

  }

  openAddNewTask() {
    this.displayStyleAddTask = "block";

  }

  closeAddNewTask() {
    this.displayStyleAddTask = "none";

  }


}
