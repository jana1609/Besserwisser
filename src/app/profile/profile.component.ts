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
hidedelete = true;
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
      this.UserService.changeUsername(username).subscribe(
        res => {
          this._snackBar.open('Erfolgreiche Umbennenung', 'Success', {duration: 2000});
        } 
        ,err => { 
          this._snackBar.open('Ein Fehler ist aufgetreten', 'Error', {duration: 2000});
        }
      );
    }

  }

  updatePassword(password, confirmPassword){
    if(this.p.invalid){
      this.printErrMsg("Password not valid!");
    }else if(password != confirmPassword){
      this.printErrMsg("Passwords do not match!");
    }else {
      this.UserService.changePassword(password).subscribe(
        res => {
          this._snackBar.open('Passwort erfolgreich geändert', 'Success', {duration: 2000});
        }
        ,err => {
          this._snackBar.open('Ein Fehler ist aufgetreten', 'Error', {duration: 2000});
        }
      )
      
    }
  }

  deleteUserInfo(){
    
    let confirmVar = confirm("Wollen Sie wirklich Ihren Nutzer löschen?")

    if (confirmVar == true){
      this.UserService.deleteUser().subscribe(
        res => {
          this.route.navigateByUrl('/startpage');
          this._snackBar.open('Nutzer erfolgreich gelöscht', 'Success', {duration: 2000});
        }
        ,err => {
          this._snackBar.open('Ein Fehler ist aufgetreten', 'Error', {duration: 2000});
        }
      )

    }
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
