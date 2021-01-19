import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;
  hideconfirm = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  confirmPass = new FormControl();

  constructor(private _snackBar: MatSnackBar) { }

  register(username, email, password){
    let message = "Username: " + username + ", E-Mail: " + email;
    this._snackBar.open(message, 'Registered', {duration: 2000,});
  }




  getErrorMessage(){
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }



  ngOnInit(): void {
  }


}
