import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-admins',
  templateUrl: './add-admins.component.html',
  styleUrls: ['./add-admins.component.css']
})
export class AddAdminsComponent implements OnInit {

@Output() closeClicked = new EventEmitter();
displayStyle="block"
constructor(){}

  ngOnInit(): void {
    

  }
 
  closePopup(){
    this.closeClicked.emit()
    this.displayStyle = "none";
  }
}
