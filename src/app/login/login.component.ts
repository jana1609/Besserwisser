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

  user: User;

  constructor(private _snackBar: MatSnackBar, private userService: UserService) { }

  login(username: string, password: string) {
    // check user expect boolean return
    let exists: boolean = this.userService.checkUserExist(username);
    //wenn nutzer existiert
    if(exists){
      let response = this.userService.checkUserPass(username, password);
      if(response.passOk){
        // password correct
        //todo route to home with usertoken
        let userToken = response.userToken;
      }
      else {
        // password wrong
        this.printErrMsg("Username or Password incorrect!");
      }
    }
    else {
      // username doesn't exist
      this.printErrMsg("Username or Password incorrect!");
    }
  }

  printErrMsg(err: string){
    //todo print it
  }

  ngOnInit(): void {

  }
}
