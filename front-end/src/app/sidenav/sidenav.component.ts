import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SwitchHeaderService } from '../service/switch-header.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

view:string=""
role:string = environment.role
constructor(private switchHeader:SwitchHeaderService){
this.view=this.switchHeader.getCurrentView()
}  



}
