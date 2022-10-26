import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../us';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // user: User = {
  //   userName: '',
  //   password: '',
  //   token: ''
  // };
  // constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }
  // loginFunc(){
  //   this.auth.login(this.user);
  // }

}
