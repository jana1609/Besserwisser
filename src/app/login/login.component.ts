import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {User} from '../models/user';
import {UserService} from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  user: User;
  errMsg: string = "";

  constructor(private _snackBar: MatSnackBar, private userService: UserService) { }

  login(username: string, password: string) {
    // login checks if user login data is good
    this.userService.loginUser();
    // todo subscribe
  }

  printErrMsg(err: string){
    this.errMsg = err;
  }

  ngOnInit(): void {

  }
}
