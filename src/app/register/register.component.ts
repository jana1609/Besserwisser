import {Component, NgModule, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {User} from '../models/user';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {


  hide = true;
  hideconfirm = true;
  hidedelete = true;
  errMsg: string = "";
  user: User;

  p = new FormControl('',
    [Validators.required, Validators.minLength(8),
      containsNumberValidator(), containsSymbolValidator()])

  confirm(first, second){
    return first === second;
  }

  getErrorMessage() {
    if (this.p.hasError('required')) {
      return 'You must enter a value';
    }
    else if (this.p.hasError('minlength')) {
      return 'Password min lenght is 8';
    }
    else if (this.p.hasError('noNumber')) {
      return 'Password requires a number';
    }
    else if (this.p.hasError('noSymbol')) {
      return 'Password requires a symbol';
    }
  }

  constructor(private _snackBar: MatSnackBar, private userService: UserService, private route: Router) { }

  register(username, password, confirm){
    if(username.length===0){
      this.printErrMsg("Username not entered");
    }
    else if(this.p.invalid){
      this.printErrMsg("Password not valid");
    }
    else if(password != confirm){
      this.printErrMsg("Password not confirmed");
    }
    else {
        // post user expect arr with boolean and event. err msg return
        let response = this.userService.addUser();
        //todo add subscribe
        let added: boolean;
        added = true;
        // wenn funktioniert
        if(added) {
          this.route.navigateByUrl('/login');
        }
        // wenn Fehler
        else {
          // gib den Fehler aus
          this.printErrMsg('');
          // bleib bei register
        }

    }
  }

  printErrMsg(err: string){
    this.errMsg = err;
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
