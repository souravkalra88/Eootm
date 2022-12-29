import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { SwitchHeaderService } from '../service/switch-header.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardUserGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService , private switchView : SwitchHeaderService){

  }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let isAuth = this.authService.isLoggedIn("user")
      if(!isAuth) {
        


    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {

        this.router.navigate([""]);  

    });
        alert("Log in Access denied")
      }
      
      
     
      
      return isAuth;
  }
  
}
