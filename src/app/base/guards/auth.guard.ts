import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private route:Router,
             private authService:AuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      const isAuthenticated = localStorage.getItem('userdetails');


   
  
      // this.userDetails = JSON.parse(userDetailsJson||'');
      // console.log(this.userDetails.UserId)
      // const userId = this.userDetails.UserId;
    if(isAuthenticated){
      return true

    }
    else{
      this.route.navigate(['/'])
      return false;
    }
      
  }
  
}



