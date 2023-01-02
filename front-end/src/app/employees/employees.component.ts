import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetAllEmployeesService } from '../service/get-all-employees.service';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
 
import { Router } from '@angular/router';
import { GetAllUsersService } from '../service/get-all-usersservice';
import { User } from '../models/UserModel';
import { UpdateTaskTypeService } from '../service/update-tasktype.service';
import { UpdateUserService } from '../service/update-user.service';

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
  
  currentUserSelected : User = new User();
  
  openAddPopup:boolean = false; 

 
    
  displayStyleEdit = "none";
  

 
  constructor(private http : HttpClient, private GetAllEmployees:GetAllEmployeesService, private router :Router, private getAllUsers: GetAllUsersService, private updateUser:UpdateUserService){
 
}
ngOnInit(): void{
  
  this.getAllUsers.getAllUsers().subscribe((responsedata: any) => {
    //   this.allAdminsList = responsedata;
  //  console.log(responsedata);
    this.AllEmployees = responsedata;
    console.log(this.AllEmployees);
    

    this.dtTrigger.next(void 0);
  })

  this.dtOptions = {

    pagingType: 'full_numbers',

    pageLength: 5,

    lengthMenu: [5,10,15,20] 

  }; 
}




  


openAddPopUpFn(){
  this.openAddPopup = true;
}
closeAddPopUpFn(){
  this.openAddPopup = false;
}
 
openEditPopup(employee: any,inputForm: NgForm){
  
  this.currentUserSelected['name'] = employee.name;
  this.currentUserSelected['email'] = employee.email;
  this.currentUserSelected['custom:role'] = employee['custom:role']
  this.currentUserSelected['phone_number'] = employee.phone_number;
  this.currentUserSelected['custom:date_of_joining']= employee['custom:date_of_joining'];
  this.currentUserSelected['gender'] = employee.gender;
  this.currentUserSelected['profile'] = employee.profile;
  this.currentUserSelected['username'] = employee.sub;
  this.currentUserSelected['custom:log_in_access'] = employee['custom:log_in_access']

  // console.log(this.currentUserSelected)
   
  console.log(this.currentUserSelected)

 
  this.displayStyleEdit = "block";

}

closeEditPopup() {
  this.displayStyleEdit = "none";
}
 
saveEditEmploee(){

  this.updateUser.updateUser(this.currentUserSelected).subscribe(data => {
   // console.log(data);
    const currentRoute = this.router.url;



    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {

        this.router.navigate([currentRoute]);  

    });
  })
 // console.log(this.tname);
this.closeEditPopup()

}
closeAddClicked(){
this.openAddPopup = false;  
}

}
