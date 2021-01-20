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

  user: User;

  //todo nicht alle password eingaben erlauben

  constructor(private _snackBar: MatSnackBar, private userService: UserService) { }

  register(username, password){
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

  printErrMsg(err: string){
    //todo print it
  }

  ngOnInit(): void {
  }


}
