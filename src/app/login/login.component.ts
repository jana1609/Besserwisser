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

  login(username: string, password: string): void{
    // login checks if user login data is good
    this.userService.loginUser(username, password).subscribe(
      res => {
        if (res.valid){
          this.userService.setToken(res.token);
          this.userService.setLoggedIn(res.user);
          this._snackBar.open('Successfully logged in!','Login',{duration: 4000,});
          this.route.navigateByUrl('/dashboard');
        }
        else {
          this.printErrMsg(res.message);
          this._snackBar.open(res.message,'Error',{duration: 4000,});
        }
      },
      err => {
        this.printErrMsg(err.message);
        this._snackBar.open(err.message,'Error',{duration: 4000,});
      });
  }

  printErrMsg(err: string): void{
    this.errMsg = err;
  }

  ngOnInit(): void {

  }
}
