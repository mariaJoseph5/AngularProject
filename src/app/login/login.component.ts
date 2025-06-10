import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faUserCircle = faUserCircle;
  isLoggedIn = false;
  hasAttemptedLogin = false;
  errorMessage = "Login failed! The user name or password is invalid.";
  userForm = this.fb.group({
    userName: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.userForm.valueChanges.subscribe(() => {
      this.hasAttemptedLogin = false;
    })
  }

  loginFunc() {
    this.hasAttemptedLogin = true;
    this.isLoggedIn = this.auth.login(this.userForm.value);
    this.router.navigate(['/home/dashboard']);
  }

}
