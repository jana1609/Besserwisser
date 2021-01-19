import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {User, UserService} from '../config/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;
  hideconfirm = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  confirmPass = new FormControl();

  constructor(private _snackBar: MatSnackBar, private userService: UserService) { }

  user: User;
  register(username, password){
    this.userService.getUser(username)
      .subscribe((data: User) => this.user = data);
//todo get err wenn es keinen user gibt und mach dann folgendes
    this.user.username = username;
    this.user.password = password;
    this.userService.addUser(this.user);

    let message = "Username: " + username;
    this._snackBar.open(message, 'Registered', {duration: 2000,});
  }

  getErrorMessage(){
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }



  ngOnInit(): void {
  }


}
