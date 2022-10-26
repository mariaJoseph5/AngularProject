import { Component, OnInit } from '@angular/core';
import { User } from '../us';
import {HttpClient} from '@angular/common/http';
import { DataService } from '../data.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-display-users',
  templateUrl: './display-users.component.html',
  styleUrls: ['./display-users.component.scss']
})
export class DisplayUsersComponent implements OnInit {
  userList: User[] = [];
  constructor(private httpClient: HttpClient, private data: DataService, private router: Router) { }

  ngOnInit(): void {
    this.httpClient.get<User[]>("http://localhost:3000/users").subscribe((data)=>{
      this.userList = data;
      this.data.userList = data;
      this.data.hasVisited = true;
    }, (error)=>{
      console.log(error);
    });
  }
  openForm(user: any){
    this.data.idVal = user.id;
    this.router.navigate(['/add']);
  }

}
