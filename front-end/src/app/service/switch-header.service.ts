import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SwitchHeaderService {
  private view:string = "";
  constructor(private router : Router) { }
  switchTo(view:string) {
    this.view = view;
 


    
 
    return this.view; 
  }

  setView(view : any){
    this.view = view
  }

  getCurrentView() {
    return this.view;
  }
}
