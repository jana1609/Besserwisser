import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  //TODO FormControlName Password

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  login(username: string, password: string) {
    let message = "Username: " + username;
    this._snackBar.open(message, 'Logged In', {duration: 2000,});
  }
}
