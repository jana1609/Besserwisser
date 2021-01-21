import { Injectable } from '@angular/core';
import {User} from './models/user';
import {Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private serverUrl = 'https://besserwisser.herokuapp.com/';
  private userUrl = 'user/';
  private searchUrl = 'search/';

  token: string; // Use for authentication later
  loggedIn: User;

  private httpOptionsObject = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private httpOptions = {
    headers: new HttpHeaders()
  };

  constructor(private http: HttpClient) { }

  searchForUsers(term: string): Observable<User[]>{
    return this.http.get<User[]>(this.serverUrl + this.userUrl + this.searchUrl + term, this.httpOptionsObject);
  }

  getUserById(id: number): Observable<User>{
    return this.http.get<User>(this.serverUrl + this.userUrl + id, this.httpOptionsObject);
  }

  getUserByName(name: string): Observable<User>{
    return this.http.get<User>(this.serverUrl + this.userUrl + name, this.httpOptions);
  }

  private setHeaders(token: string): void{
    this.httpOptionsObject = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    };
    this.httpOptions = {
      headers: new HttpHeaders({'Authorization': token})
    };
  }
}
