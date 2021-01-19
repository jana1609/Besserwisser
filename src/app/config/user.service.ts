import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  userUrl = "db/user";

  getUser(username: string): Observable<User>{
    const url = '${this.userUrl}/${username}';
    return this.http.get<User>(url);
  }

  addUser(user: User) {
    this.http.post<User>(this.userUrl, user);
  }
}

export interface User {
  id: number;
  username: string;
  password: string;
}

