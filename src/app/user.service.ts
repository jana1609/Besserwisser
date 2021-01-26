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
  private loginUrl = 'login/';
  private registerUrl = 'register';

  token: string; // Use for authentication later
  loggedIn: User = {id: 1, name: 'user1'};

  private httpOptionsObject = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private httpOptions = {
    headers: new HttpHeaders()
  };

  constructor(private http: HttpClient) { }

  searchForUsers(term: string): Observable<User[]>{
    // return this.http.get<User[]>(this.serverUrl + this.userUrl + this.searchUrl + term, this.httpOptionsObject);
    return of([{id: 2, name: 'user2'}, {id: 3, name: 'user3'}, {id: 4, name: 'user4'}]);
  }

  getUserById(id: number): Observable<User>{
    // return this.http.get<User>(this.serverUrl + this.userUrl + id, this.httpOptionsObject);
    if (id === 2){
      return of({id: 2, name: 'user2'});
    }
    else if (id === 3){
      return of({id: 3, name: 'user3'});
    }
    else if (id === 4){
      return of({id: 4, name: 'user4'});
    }
    else {
      return null;
    }
  }

  getUserByName(name: string): Observable<User>{
    // return this.http.get<User>(this.serverUrl + this.userUrl + name, this.httpOptions);
    if (name === 'user2'){
      return of({id: 2, name: 'user2'});
    }
    else if (name === 'user3'){
      return of({id: 3, name: 'user3'});
    }
    else if (name === 'user4'){
      return of({id: 4, name: 'user4'});
    }
    else {
      return null;
    }
  }

  private setHeaders(token: string): void{
    this.httpOptionsObject = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    };
    this.httpOptions = {
      headers: new HttpHeaders({'Authorization': token})
    };
  }

  loginUser(u, p){
    const body = {username: u, password: p}
    return this.http.post<any>(this.serverUrl + this.loginUrl, body);
  }

  addUser(u, p){
    console.log("at user service")
    return this.http.post<any>(this.serverUrl + this.registerUrl,{username: u, password: p}, this.httpOptionsObject);
  }
}
