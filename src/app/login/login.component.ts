import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {User, UserService} from '../config/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  //TODO FormControlName Password

  constructor(private _snackBar: MatSnackBar, private userService: UserService) { }

  ngOnInit(): void {
  }

  user: User;
  login(username: string, password: string) {
    this.userService.getUser(username)
      .subscribe((data: User) => this.user = data);

    if(this.user.password === password) {
      let message = "Username: " + username;
      this._snackBar.open(message, 'Logged In', {duration: 2000,});
    }
    else {
      this._snackBar.open("username or password wrong", 'Try again', {duration: 2000,})
    }
    //todo go to home with userid als href parameter, nicht sichtbar
  }
}
