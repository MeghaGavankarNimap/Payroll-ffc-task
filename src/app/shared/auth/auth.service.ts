import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SessionStorage } from 'storage/session-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http:HttpClient,
    private sessionStorage:SessionStorage) { }

 

  signIn(username:any,password:any): Observable<any> {
    const url = environment.baseUrl; 
  
    return this.http.post<any>(url, {username,password});
  }



  getToken() {
    // let user = JSON.parse(this.sessionStorage.getItem('User')); 
    // if (user) {
    //   return user;
    // }
  }

  isLoggedIn() {
    return "hello"
    // return !!this.sessionStorage.getItem('user');
  }
}
