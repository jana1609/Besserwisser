import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
declare var require: any;
const db = require("./db");
const client = db.getDb();
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

    if(this.findUser(username,password) != null){
      //User exists

    }

    let message = "Username: " + username;
    this._snackBar.open(message, 'Logged In', {duration: 2000,});
  }

  //funktion die sql abfrage macht und nach dem user sucht
  findUser(username, password){
    //todo datenbank abfrage ob es den Nutzer gibt

    let result;
    const query = {
      name: 'fetch-user-id',
      text: 'SELECT id FROM user WHERE username = $1 AND password = $2',
      values: [username, password],
    }

    client
      .query(query)
      .then(res => result = res.rows[0])
      .catch(err => console.log(err.stack))

    let userId = "1";
    userId = result;
    return userId;
  }
}
