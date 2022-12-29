import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AddUserService } from 'src/app/service/add-user.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {


  @Output() closeClicked = new EventEmitter();
  displayStyle = "block";
  constructor(private router :Router, private addUser:AddUserService){}

  ngOnInit(): void {
    
  } 
  Input(form:  NgForm){
    var data = form.value;
    // console.log(data.name);
    // debugger;
    const body ={
      
      "name":data.empsname,
      "password": "Pass@123",
      "email":data.empsemail,
      "gender":data.empsgender,
      "phone_number":data.empsphone,
      "profile":data.empsprofile,
      "role":data.empsrole

  }

  

 this.addUser.addUser(body);
  console.log(body);
   
    // this.CreateEmployee.createEmployee(myPostObject).subscribe((responsedata:any)=>{
    //   console.log(responsedata);
    // });
   
    
    const currentRoute = this.router.url;
  
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentRoute]);  
    }); 
   
  
      this.closePopup();
    }
    
  
    
    closePopup() {
      this.displayStyle = "none";
      this.closeClicked.emit();
    }
}
