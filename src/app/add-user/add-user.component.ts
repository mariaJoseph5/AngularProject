import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { DataService } from '../data.service';
import { User } from '../us';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  title = 'routing';
  displayMessageFlag = false;
  userForm = this.fb.group({
    id: new FormControl(0),
    firstName: new FormControl(),
    lastName: new FormControl(),
    age: new FormControl(),
    email: new FormControl(),
    address: new FormControl(),
    city: new FormControl()
  });
  submitted = false;
  user: User = {
    firstName: "",
    lastName: "",
    age: null,
    email: "",
    city: "",
    address: '',
    id: 0
  };
  constructor(private fb: FormBuilder, private data: DataService){

  }
  ngOnInit(): void {
    if (this.data.idVal !=0){
      for(var i=0; i<this.data.userList.length;i++){
        if (this.data.userList[i].id == this.data.idVal){
          this.user = this.data.userList[i];
          break;
        }
      }
    }
    this.userForm = this.fb.group({
      id: new FormControl(this.user.id),
      firstName: new FormControl(this.user.firstName, [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
      lastName: new FormControl(this.user.lastName, [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
      age: new FormControl(this.user.age, [Validators.required, Validators.maxLength(2), Validators.pattern(/^[0-9]+$/)]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      address: new FormControl(this.user.address, Validators.required),
      city: new FormControl(this.user.city,  [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)])
    });
  }
  submit(){
    this.submitted = true;
    let isUnique = true;
    if (this.data.idVal == 0){
      for(var i=0; i<this.data.userList.length; i++){
        if (this.userForm.value.email == this.data.userList[i].email){
          isUnique = false;
        }
      }
    }
    if (this.userForm){
      this.data.idVal ? this.data.putCall(this.userForm.value) :  (isUnique) ? this.data.postCall(this.userForm.value) : (this.displayMessageFlag = true);
  }
}
}
