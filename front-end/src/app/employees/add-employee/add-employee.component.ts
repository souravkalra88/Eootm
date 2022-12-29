import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/UserModel';
import { AddUserService } from 'src/app/service/add-user.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {


  @Output() closeClicked = new EventEmitter();
  newUserData:User = new User()
  displayStyle = "block";
  constructor(private router :Router, private addUser:AddUserService){}

  ngOnInit(): void {
    
  } 
  Input(form:  NgForm){
   
    // console.log(data.name);
    // debugger;
    if(this.newUserData['custom:role'] === 'admin') this.newUserData['custom:log_in_access'] = 'yes'
    const body ={
      
      "name":this.newUserData.name,
      "password": "Pass@123",

      "email":this.newUserData.email,
      "gender":this.newUserData.gender,
      "phone_number":this.newUserData.phone_number,
      "profile":this.newUserData.profile,
   
      "role": this.newUserData['custom:role'],
      "log_in_access": this.newUserData['custom:log_in_access'],


  }

  

 this.addUser.addUser(body).subscribe(data =>{

  const currentRoute = this.router.url;
  
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);  
  }); 
 });
  console.log(body);
   
    // this.CreateEmployee.createEmployee(myPostObject).subscribe((responsedata:any)=>{
    //   console.log(responsedata);
    // });
   
    
    
   
  
      this.closePopup();
    }
    
  
    
    closePopup() {
      this.displayStyle = "none";
      this.closeClicked.emit();
    }
}
