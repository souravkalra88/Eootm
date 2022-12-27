
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { GetAllEmployeesService } from '../service/get-all-employees.service';
import { Router } from '@angular/router';
import { AddtaskComponent } from './addtask/addtask.component';

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



  constructor(private http : HttpClient, private GetAllEmployees:GetAllEmployeesService, private router :Router){
 
  }
  ngOnInit(): void{
    this.GetAllEmployees.allEmployeesData().subscribe((responsedata:any)=>{
      this.AllEmployees=responsedata;
      console.log(this.AllEmployees);
      this.dtTrigger.next(void 0);
      console.log("responsedata",responsedata);
    })
  
    console.log(this.AllEmployees);
    this.dtOptions = {
  
      pagingType: 'full_numbers',
  
      pageLength: 5,
  
      lengthMenu: [5,10,15,20] 
  
    }; 
  }



  manageEmployee(Employee:any):void {
    this.router.navigate(['/task-list/manage'],{
      state:{employee:Employee}
    });
  }

  
  openPopup(){
  this.openaddpopup=true;
  }


  closeAdd(val : boolean){
    this.openaddpopup=false;
  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


}

