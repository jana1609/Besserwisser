import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {User, UserService} from '../config/user.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;
  hideconfirm = true;
  confirmPass = new FormControl();
  errMsg: string = "";
  user: User;

  //todo sonderzeichen machen probleme bei dem pattern fürs confirm passwort

  constructor(private _snackBar: MatSnackBar, private userService: UserService) { }

  register(username, password, confirm){
    this.passwordErr(password);
    if(username.length===0){
      this.printErrMsg("Username not entered");
    }
    else if(this.passwordErrShow){
      this.printErrMsg("Password not valid");
    }
    else if(password != confirm){
      this.printErrMsg("Password not confirmed");
    }
    else {
      // check user expect boolean return
      let exists: boolean = this.userService.checkUserExist(username);
      //wenn nutzer existiert
      if(exists) this.printErrMsg("Dieser Nutzername ist schon vergeben!");
      // wenn nicht
      else {
        // post user expect arr with boolean and event. err msg return
        let response = this.userService.addUser(username, password);
        let added: boolean = response.added;
        // wenn funktioniert
        if(added) {
          //todo redirect zu Login
        }
        // wenn Fehler
        else {
          // gib den Fehler aus
          this.printErrMsg(response.msg);
          // bleib bei register
        }
      }

    }
  }

  printErrMsg(err: string){
    this.errMsg = err;
  }

  passwordErrMsg: string;
  passwordErrShow: boolean;

  passwordErr(pass: string){
    if(pass.length<8){
      this.passwordErrShow = true;
      this.passwordErrMsg = "Password length needs to be min 8";
    }
    else if(!this.hasNumber(pass)){
      this.passwordErrShow = true;
      this.passwordErrMsg = "Password needs min one number";
    }
    else if(!this.hasSymbol(pass)){
      this.passwordErrShow = true;
      this.passwordErrMsg = "Password needs min one symbol";
    }
    else this.passwordErrShow = false;
  }

  hasNumber(pass: string){
    return /\d/.test(pass);
  }

  private hasSymbol(pass: string) {
    return /[\s~`!@#$%\^&*=\-\[\]\\';,/{}|\\":<>\?()\._]/g.test(pass);
  }

  ngOnInit(): void {
  }



}
