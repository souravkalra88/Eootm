import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetAllEmployeesService } from '../service/get-all-employees.service';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import settings from 'src/assets/settings.json' 
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
  genders:any[]=[]
  currentUserSelected : User = new User();
  
  openAddPopup:boolean = false; 

 
    
  displayStyleEdit = "none";
  

 
  constructor(private http : HttpClient, private GetAllEmployees:GetAllEmployeesService, private router :Router, private getAllUsers: GetAllUsersService, private updateUser:UpdateUserService){
 
}
ngOnInit(): void{
  this.genders=settings.genders
  this.getAllUsers.getAllUsers().subscribe((responsedata: any) => {
    
  
    this.AllEmployees = responsedata;
    

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
  this.currentUserSelected['phone_number'] = employee.phone_number.substring(3);
  this.currentUserSelected['custom:date_of_joining']= employee['custom:date_of_joining'];
  this.currentUserSelected['gender'] = employee.gender;
  this.currentUserSelected['profile'] = employee.profile;
  this.currentUserSelected['username'] = employee.sub;
  this.currentUserSelected['custom:log_in_access'] = employee['custom:log_in_access']

  

 
  this.displayStyleEdit = "block";

}

closeEditPopup() {
  this.displayStyleEdit = "none";
}
 
saveEditEmploee(){
  this.currentUserSelected['phone_number'] = '+91' + this.currentUserSelected['phone_number']
  this.updateUser.updateUser(this.currentUserSelected).subscribe(data => {
   
    const currentRoute = this.router.url;



    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {

        this.router.navigate([currentRoute]);  

    });
  })
 
this.closeEditPopup()

}
closeAddClicked(){
this.openAddPopup = false;  
}

}
