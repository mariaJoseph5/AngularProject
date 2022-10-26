import { Injectable } from '@angular/core';
import {Router  } from "@angular/router";
import { User } from "./us";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }
  login( user: User){
    // if (user.userName == 'test' && user.password == 'test'){
    //   let token = 'xyz6576t767y';
    //   localStorage.setItem('token', token);
    //   this.router.navigate(['/home']);
    // } else{
    //   this.router.navigate(['/login']);

    // }
  }
    isAuthenticated():boolean{
      return localStorage.getItem('token') !=null;
    }
    logOut(){
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  
}

