import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './us';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  userList: User[] = [];
  idVal: number =0;
  hasVisited = false;

  constructor(private httpClient: HttpClient, private router: Router) { }
  postCall(value: any){
    this.httpClient.post("http://localhost:3000/users", {...value, id: this.userList.length+1}).subscribe((data)=>{
    this.router.navigate(['/display']);
   }, (error)=>{
    console.log(error);
   })
  }
  putCall(value: any){
    this.httpClient.put(`http://localhost:3000/users/${this.idVal}`, value).subscribe((data)=>{
      this.router.navigate(['/display']);
     }, (error)=>{
      console.log(error);
     })
  }
}
