import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetAllEmployeesService } from '../service/get-all-employees.service';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { CreateNewEmployee } from '../service/create-new-employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
 })
export class EmployeesComponent {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>=new Subject<any>();
  AllEmployees:any;
 
  tasktypes=["onboarding","offboarding"];
  selectedtask:string="";
    
displayStyleEdit = "none";
displayStyle = "none";
  constructor(private http : HttpClient, private GetAllEmployees:GetAllEmployeesService, private CreateEmployee:CreateNewEmployee){
    // this.lis=[];
}
ngOnInit(): void{
  this.GetAllEmployees.allEmployeesData().subscribe((responsedata:any)=>{
    this.AllEmployees=responsedata;
    this.dtTrigger.next(void 0);
    console.log(responsedata);
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
openPopup() {
  this.displayStyle = "block";
}
closePopup() {
  this.displayStyle = "none";
}

Input(form:  NgForm){
  var data = form.value;
  console.log(data.name);
  // debugger;
  var myPostObject ={
    "tasktype":this.selectedtask,
    "name":data.name,
    "email":data.email,
    "phone":data.phone,
    "profile":data.empsprofile,
    "date_of_event":"12/12/12"
}
console.log(myPostObject);
 
  this.CreateEmployee.createEmployee(myPostObject).subscribe((responsedata:any)=>{
    console.log(responsedata);
  });
    this.closePopup();
  }


  
InputEdit(form:  NgForm){

  }
openEditPopup(){
  this.displayStyleEdit = "block";

}

closeEditPopup() {
  this.displayStyleEdit = "none";
}
openTaskPopup(){
  
}
}
