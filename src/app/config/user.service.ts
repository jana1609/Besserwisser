import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface User {
  //todo remove in future, have User somewhere else
  id: number;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  //userUrl = "db/user";

  // check user password expects passOk: boolean, usertoken, errmsg als string return
  checkUserPass(username: string, password: string) {
    let response = {passOk: true, userToken: "test token", errMsg: "test msg - none"};
    //todo GET user und change response
    return response;
  }

  // check user exists expect boolean return
  checkUserExist(username: string): boolean {
    let userExists = false;
    //todo GET user und auswerten
    return userExists;
  }

  // post user expect boolean and event. err msg return
  addUser(username: string, password: string) {
    let response = {added: false, msg: "err msg"};
    let user: User = {id: this.getNextId(), username: username, password: password}
    // todo POST user and change response
    return response;
  }

  getNextId(): number{
    //todo berechne next id
    return 1;
  }


}



