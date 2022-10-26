import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { User } from './us';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'routing';
  constructor(private router: Router, public data: DataService){
  }
  display(){
    this.router.navigate(['/display']);
  }
  add(){
    this.data.idVal = 0;
    this.router.navigate(['/add']);
  }
}
