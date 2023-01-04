import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AddNewTasktypeToEmployeeService} from 'src/app/service/add-new-tasktype-to-employee.service';
import { GetAllEmployeesService } from 'src/app/service/get-all-employees.service';
import { GetAllTaskTypesService } from 'src/app/service/get-all-task-types.service';
import { environment } from 'src/environments/environment';
import { ConnectableObservable } from 'rxjs';
import { Router } from '@angular/router';
import { GetAllUsersService } from 'src/app/service/get-all-usersservice';
import { GetAllTasktypeAssignedUsersService } from 'src/app/service/get-all-tasktype-assigned-users.service';
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
  allEmployees:any;
  allUsers:any[]=[];
  emp: string="";
resp:any;
  task:number=0
  
  date:string=""; 
  tasktype_emp_data:any


  constructor(private router : Router,private getAllUsers:GetAllUsersService, private AllTaskTypes : GetAllTaskTypesService, private add_new_tasktype_to_employee: AddNewTasktypeToEmployeeService){

  }

  ngOnInit(): void {


    this.getAllUsers.getAllUsers().subscribe((responsedata: any) => {
      this.allEmployees = responsedata;
      this.allUsers = this.allEmployees
      
      
      
      
      
    }
      )
  

    this.AllTaskTypes.allTaskTypesData().subscribe((data: any)=>{
     
      this.TaskTypes = data;
      
          });     
        }
    
  NewTasktypeEmployee(form:NgForm){
    if(form.valid){
     
      let emp_index= form.value.emp
      console.log(emp_index)
      let task_index=form.value.empTaskType
      let date=form.value.date
      let tasktypID=this.TaskTypes[task_index]['sk']
      let tasktype_name=this.TaskTypes[task_index]['tasktype']
      let emp_name=this.allUsers[emp_index]['name']
      let empID=this.allUsers[emp_index]['sub']
      let body={
        "empID":empID,
        "date": date,
        "tasktypeID":tasktypID,
        "tasktype_name":tasktype_name,
        "CurrentUser":environment.currentUser,
        "emp_name":emp_name
      }
      
      this.add_new_tasktype_to_employee.add_new_tasktype_to_employee(body).subscribe((data: any)=>{

        this.resp=data;
     
        const currentRoute = this.router.url;

      
        
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    
            this.router.navigate([currentRoute]);  
    
        });

      });
        
    
         
  this.closePopup();
  }}
  
  closePopup(){
    this.displayStyle="None"
    this.closeClicked.emit()
  }   
    
}  