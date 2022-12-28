import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddNewTasktypeToEmployeeService} from 'src/app/service/add-new-tasktype-to-employee.service';
import { GetAllEmployeesService } from 'src/app/service/get-all-employees.service';
import { GetAllTaskTypesService } from 'src/app/service/get-all-task-types.service';
import { environment } from 'src/environments/environment';
import { ConnectableObservable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {

  @Output() closeClicked = new EventEmitter<boolean>()
  @Output() saveClicked = new EventEmitter<boolean>()
  displayStyleAdd = "none";
  openaddpopup:boolean=false;
  displayStyle : string = "block"
  TaskTypes:any;
  allEmpsData:any;
  empID: string="";

  task:number=0
  // tasktypeID:string=""; 
  date:string=""; 
  tasktype_emp_data:any



  constructor(private router : Router,private AllEmployees:GetAllEmployeesService, private AllTaskTypes : GetAllTaskTypesService, private add_new_tasktype_to_employee: AddNewTasktypeToEmployeeService){

  }

  ngOnInit(): void {
    
    this.AllEmployees.allEmployeesData().subscribe((data: any)=>{
      console.log(data);
      this.allEmpsData = data;
      // console.log(this.allEmpsData);
          });

    this.AllTaskTypes.allTaskTypesData().subscribe((data: any)=>{
      console.log(data);
      this.TaskTypes = data;
      // console.log(this.allEmpsData);
          });     
        }
  
        
  NewTasktypeEmployee(form:NgForm){
    if(form.valid){
      let emp_id = form.value.emp
      let task_index=form.value.tasktype
      let date=form.value.date
      let tasktypID=this.TaskTypes[task_index]['sk']
      let tasktype_name=this.TaskTypes[task_index]['tasktype']

      let body={
        "empID":emp_id,
        "date": date,
        "tasktypeID":tasktypID,
        "tasktype_name":tasktype_name,
        "CurrentUser":environment.currentUser
      }
      console.log(body)
      this.add_new_tasktype_to_employee.add_new_tasktype_to_employee(body).subscribe((data: any)=>{
        
        console.log("POST SUCCESS")});
        const currentRoute = this.router.url;



    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {

        this.router.navigate([currentRoute]);  

    });
             
  this.closePopup();

  }}

  closePopup(){
    this.displayStyle="None"
  }    
    }