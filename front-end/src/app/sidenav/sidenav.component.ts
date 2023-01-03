import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SwitchHeaderService } from '../service/switch-header.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit  {

view:string=""
role:string = environment.role
constructor(private switchHeader:SwitchHeaderService){
this.view=this.switchHeader.getCurrentView()
}  
  ngOnInit(): void {
 
  }
getView():string
{
 
  return this.switchHeader.getCurrentView()
}



}
