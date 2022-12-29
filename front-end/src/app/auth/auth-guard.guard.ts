import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService){

  }
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isAuth = this.authService.isLoggedIn(("admin"))
    if(!isAuth) {
      this.router.navigate([""])
      alert("Log in Access denied")
    }
    
   // console.log(environment.currentUser + " // " + environment.currentUserName)
    
    return isAuth;
  }
  
}
