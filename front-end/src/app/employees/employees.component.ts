import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetAllEmployeesService } from '../service/get-all-employees.service';
import { Subject } from 'rxjs';


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
  }

  )
}
 
displayStyle = "none";

openPopup() {
  this.displayStyle = "block";
}
closePopup() {
  this.displayStyle = "none";
}
}
