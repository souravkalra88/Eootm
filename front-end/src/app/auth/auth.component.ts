import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';
import { SwitchHeaderService } from '../service/switch-header.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit{
  ngOnInit(): void {} 
  imgSrc:string = "assets/img/home_lg.svg";
  isLoading: boolean = false;
  email_address: string = "";
  password: string = "";
  forgetPasswordUrl : string = "https://eoomt.auth.ap-south-1.amazoncognito.com/forgotPassword?client_id=48hko2q1qsd36p6d3kcrla334j&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone&redirect_uri=https://eoomt-79406.web.app/";
  constructor(private router: Router , private switchView:SwitchHeaderService) { }

  OnSignIn(form: NgForm){

    this.email_address=  form.value.login;
    this.password = form.value.password
    if (form.valid) {
      this.isLoading = true;
      let authenticationDetails = new AuthenticationDetails({
          Username: this.email_address,
          Password: this.password,
      });


    let poolData = {
      UserPoolId: environment.cognitoUserPoolId, 
      ClientId: environment.cognitoAppClientId 
    };

    let userPool = new CognitoUserPool(poolData);
    let userData = { Username: this.email_address, Pool: userPool };

    

     
    var cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        
        environment.currentUser = result.getIdToken().payload['name']
        environment.role =  result.getIdToken().payload['role']
       
       // console.log(result.getIdToken().getJwtToken())
        environment.idToken = result.getIdToken().getJwtToken()
        environment.currentUserName = result.getIdToken().payload['cognito:username']
        if(environment.role === 'admin'){
        this.switchView.setView("admin_view");this.router.navigate(["admin-view/home"])
      }

        else{ this.switchView.setView("user_view") ; this.router.navigate(["user-view"]) }
       
    
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err));
        this.isLoading = false;
      },
    });

  }

  }
}  

