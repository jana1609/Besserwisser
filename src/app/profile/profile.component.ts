import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn, Validators } from "@angular/Forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { User } from "../models/user";
import { UserService } from "../user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

hide = true;
hideconfirm = true;
errMsg: string = "";
user: User; 

p = new FormControl('', [
  Validators.required, Validators.minLength(8),
  containsNumberValidator(), containsSymbolValidator()
])

confirm(firstInput, secondInput){
  return firstInput === secondInput;
}

getErrorMessage(){
  if(this.p.hasError('required')){
    return 'You must enter a password!';
  }
  else if(this.p.hasError('minlength')){
    return 'Password min length is 8!';
  }
  else if(this.p.hasError('noNumber')){
    return 'Password requires a number!';
  }
  else if(this.p.hasError('noSymbol')){
    return 'Password requires a symbol!';
  }
}

printErrMsg(err: string){
  this.errMsg = err;
}


  constructor(private _snackBar: MatSnackBar, private UserService: UserService, private route: Router) {} 

  updateUsername(username){
    if(username.length === 0){
      this.printErrMsg("No Username entered")
    }else{
      //CHANGE USERNAME -> CALL changeUsername in user.service.ts
    }

  }

  updatePassword(password, confirmPassword){
    if(this.p.invalid){
      this.printErrMsg("Password not valid!");
    }else if(password != confirmPassword){
      this.printErrMsg("Passwords do not match!");
    }else {
      //CHANGE PASSWORD -> CALL changePassword in user.service.ts

    }
  }

  /**
   * CHECK IF PASSWORD INPUT IS CORRECT 
   * DELETE USER -> DELETE HTTP REQUEST
   */

  deleteUserInfo(password){

    //Check Password
    //DELETE USER -> CALL deleteUser in user.service.ts
    window.alert('This will delete the userinfo.' +password);

  }


  ngOnInit(): void {
  }

}

export function containsNumberValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = !/\d/.test(control.value);
    return forbidden ? {noNumber: {value: control.value}} : null;
  };
}

export function containsSymbolValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = !/[\s~`!@#$%\^&*=\-\[\]\\';,/{}|\\":<>\?()\._]/.test(control.value);
    return forbidden ? {noSymbol: {value: control.value}} : null;
  };
}
