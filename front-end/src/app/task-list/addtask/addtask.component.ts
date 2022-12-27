import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GetAllEmployeesService } from 'src/app/service/get-all-employees.service';
@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {

  @Output() closeClicked = new EventEmitter<boolean>()
  @Output() saveClicked = new EventEmitter<boolean>()
  displayStyleAdd = "none";
  openaddpopup:boolean=false;
  displayStyle : string = "block"
  taskTypes:any=["a","b","c"];
  allEmpsData:any;

  constructor(private AllEmployees:GetAllEmployeesService){

  }

  ngOnInit(): void {
    this.AllEmployees.allEmployeesData().subscribe((data: any)=>{
      console.log(data);
      this.allEmpsData = data;
      // console.log(this.allEmpsData);
          });

  }



  Input(form:NgForm){

// api call
this.closePopup();
  }

  closePopup(){
    this.displayStyle = "none";
    this.closeClicked.emit(true)
  }
}