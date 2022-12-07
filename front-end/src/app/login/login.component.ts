import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

login(){
  const URL = "https://eootm.auth.ap-south-1.amazoncognito.com/login?client_id=48hko2q1qsd36p6d3kcrla334j&response_type=code&scope=email+openid+phone&redirect_uri=https://www.google.co.in/" ;
  window.location.assign(URL)
}

}
