import { Component,OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';

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
  constructor(private router: Router) { }

  OnSignIn(form: NgForm){
    // console.log(val);
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
        this.router.navigate(["home"])
        environment.currentUser = result.getIdToken().payload['name']
        environment.role =  result.getIdToken().payload['role']
        console.log(environment.role)
        console.log(result.getIdToken().getJwtToken())
        environment.idToken = result.getIdToken().getJwtToken()
        environment.currentUserName = result.getIdToken().payload['cognito:username']
       
    
      },
      onFailure: (err) => {
        alert(err.message || JSON.stringify(err));
        this.isLoading = false;
      },
    });

  }

  }
}  

