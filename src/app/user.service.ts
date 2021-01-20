import { Injectable } from '@angular/core';
import {User} from './models/user';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  cookie: string; // Use for authentication later
  loggedIn: User;

  constructor() { }

  searchForUsers(term: string): Observable<User[]>{
    return of([
      { id: 1, name: 'anders'},
      { id: 2, name: 'günther'},
      { id: 3, name: 'albert'}
    ]);
  }

  getUserById(id: number): Observable<User>{
    return of({id: 5, name: 'test'});
  }

  getUserByName(name: string): Observable<User>{
    return of({id: 5, name: 'test'});
  }
}
