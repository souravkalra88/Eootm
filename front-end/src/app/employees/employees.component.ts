import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetAllEmployeesService } from '../service/get-all-employees.service';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
 
import { Router } from '@angular/router';
import { GetAllUsersService } from '../service/get-all-usersservice';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
 })
export class EmployeesComponent {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>=new Subject<any>();
  AllEmployees:any;
 
  tasktypes:string[]=["onboarding","offboarding"];
  selectedtask:string = "";
  tdoj:any;
  tname:any;
  tphone:any;
  tprofile:any;
  temail:any;
  openAddPopup:boolean = false; 

 
    
displayStyleEdit = "none";
  

 
  constructor(private http : HttpClient, private GetAllEmployees:GetAllEmployeesService, private router :Router, private getAllUsers: GetAllUsersService){
 
}
ngOnInit(): void{
  // this.GetAllEmployees.allEmployeesData().subscribe((responsedata:any)=>{
  //   this.AllEmployees=responsedata;
  //   this.dtTrigger.next(void 0);
  //   console.log(responsedata);
  // })
  this.getAllUsers.getAllUsers().subscribe((responsedata: any) => {
    //   this.allAdminsList = responsedata;
    console.log(responsedata);
    this.AllEmployees = responsedata;
    

    this.dtTrigger.next(void 0);
  })

  this.dtOptions = {

    pagingType: 'full_numbers',

    pageLength: 5,

    lengthMenu: [5,10,15,20] 

  }; 
}


  // this.AllEmployees=[{"name":"bhawana","email":"b@t.com", "phone":"1323324543", "profile":"intern","DOJ":"12/12/12"},
  // {"name":"sourav","email":"s@t.com", "phone":"132330024543", "profile":"intern","DOJ":"12/11/12"}]
 

onOptionsSelected(value:string){
  this.selectedtask=value;
  console.log("the selected value is " + value);
}
openAddPopUpFn(){
  this.openAddPopup = true;
}
closeAddPopUpFn(){
  this.openAddPopup = false;
}
 
openEditPopup(employee: any,inputForm: NgForm){
  this.tname = employee.name;
  this.temail = employee.email
  this.tphone = employee.phone;
  this.tdoj = employee.DOJ;
  // console.log(employee)
  console.log("doj" + this.tdoj) 
  this.tprofile=employee.profile;
   

 
  this.displayStyleEdit = "block";

}

closeEditPopup() {
  this.displayStyleEdit = "none";
}
 
saveEditEmploee(){
  console.log(this.tname);
}
closeAddClicked(){
this.openAddPopup = false;  
}

}
