import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {User} from '../models/user';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  user: User;
  errMsg: string = '';

  constructor(private _snackBar: MatSnackBar, private userService: UserService, private route: Router) {
  }

  login(username: string, password: string) {
    // login checks if user login data is good
    this.userService.loginUser(username, password).subscribe(
      res => {
        //this.setHeaders(res.id);
        this._snackBar.open('Successfully logged in!');
        this.route.navigateByUrl('/dashboard');

      },
      err => {
        this.printErrMsg(err.message);
        this._snackBar.open(err.message);
      });
  }

  printErrMsg(err: string) {
    this.errMsg = err;
  }

  ngOnInit(): void {

  }
}
