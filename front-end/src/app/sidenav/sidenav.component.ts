import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {



  list = [
    {
      number: '1',
      name: 'Home',
      icon: 'fa-solid fa-house',
      route: 'home'
      
    },{
      number: '2',
      name: 'Task Type',
      icon: 'fa-solid fa-bars',
      route: 'task-type'
    },{
      number: '3',
      name: 'Employee',
      icon: 'fa-solid fa-people-roof',
      route: 'employees'
    },{
      number: '4',
      name: 'Task List',
      icon: 'fa-solid fa-list-check',
      route: 'task-list'
    },{
      number: '5',
      name: 'Admins',
      icon: 'fa-solid fa-users',
      route: 'admins'
    }
  ]
  

}
