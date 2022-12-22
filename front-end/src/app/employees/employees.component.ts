import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetAllEmployeesService } from '../service/get-all-employees.service';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>=new Subject<any>();
  AllEmployees:any;
  constructor(private http : HttpClient, private GetAllEmployees:GetAllEmployeesService){
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

    lengthMenu: [5,10,15,20] ,

  }; 
  // this.AllEmployees=[{"name":"bhawana","email":"b@t.com", "phone":"1323324543", "profile":"intern","DOJ":"12/12/12"},
  // {"name":"sourav","email":"s@t.com", "phone":"132330024543", "profile":"intern","DOJ":"12/11/12"}]
  
}
 
displayStyle = "none";

openPopup() {
  this.displayStyle = "block";
}
closePopup() {
  this.displayStyle = "none";
}

Input(form:NgForm){
  console.log(form.value.newTaskTypeTitle);
  this.closePopup();
}

}
