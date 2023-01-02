
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { GetAllEmployeesService } from '../service/get-all-employees.service';
import { Router } from '@angular/router';
import { AddtaskComponent } from './addtask/addtask.component';
import { GetAllUsersService } from '../service/get-all-usersservice';
import { GetAllTasktypeAssignedUsersService } from '../service/get-all-tasktype-assigned-users.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  AllEmployees:any;
  openaddpopup:boolean=false;
  openEditPopUp:boolean=false;
  editEmployee:any = ""

  constructor(private http : HttpClient,private get_all_tasktype_assigned_users:GetAllTasktypeAssignedUsersService, private GetAllEmployees:GetAllEmployeesService, private router :Router){
   
  }
  ngOnInit(): void{
   
    this.get_all_tasktype_assigned_users.get_all_tasktype_assigned_users().subscribe((responsedata: any) => {
      //   this.allAdminsList = responsedata;
    //  console.log(responsedata);
      this.AllEmployees = responsedata;
      console.log("records are" ,this.AllEmployees)
  
      this.dtTrigger.next(void 0);
    })
  
   // console.log(this.AllEmployees);
    this.dtOptions = {
  
      pagingType: 'full_numbers',
  
      pageLength: 5,
  
      lengthMenu: [5,10,15,20] 
  
    }; 
  }



  manageEmployee(Employee:any , index : number):void {
    this.router.navigate(['/admin-view/task-list/manage'],{
      state:{employee:Employee ,  index:index}
    });
  }

  
  openPopup(){
  this.openaddpopup=true;
  }


  closeAdd(val : boolean){
    this.openaddpopup=false;
  }
  openEditPopup(emp:any){
    this.openEditPopUp=true;
    this.editEmployee=emp;
  }
closeEditPopup(){
  this.openEditPopUp = false
}
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


}

