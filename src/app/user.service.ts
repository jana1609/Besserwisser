import { Injectable } from '@angular/core';
import {User} from './models/user';
import {Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {FriendRequest} from "./models/friendrequest";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private serverUrl = 'https://besserwisser.herokuapp.com';
  private userUrl = '/user';
  private searchUrl = '/search';
  private loginUrl = '/login';
  private registerUrl = '/register';
  private friendsUrl = '/friends';
  private friendrequestUrl = '/request';

  token = ''; // Use for authentication later
  loggedIn: User;

  httpOptionsObject = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  httpOptions = {
    headers: new HttpHeaders()
  };

  constructor(private http: HttpClient) { }

  searchForFriendsAndUsers(term: string): Observable<User[]> {
    return this.http.get<User[]>(this.serverUrl + this.userUrl + this.searchUrl + '/' + term, this.httpOptions);
  }

  private setHeaders(token: string): void{
    this.httpOptionsObject = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    };
    this.httpOptions = {
      headers: new HttpHeaders({'Authorization': token})
    };
  }

  loginUser(u, p): Observable<any>{
    return this.http.post<any>(this.serverUrl + this.loginUrl, {username: u, password: p});
  }

  addUser(u, p): Observable<any>{
    return this.http.post<any>(this.serverUrl + this.registerUrl,{username: u, password: p}, this.httpOptionsObject);
  }

  setToken(newToken): void{
    this.token = newToken;
    this.setHeaders(newToken);
  }

  setLoggedIn(user: User): void{
    this.loggedIn = user;
  }

  searchForUsers(term: string): Observable<User[]>{
    return this.http.get<User[]>(this.serverUrl + this.friendsUrl + this.searchUrl + '/' + term, this.httpOptions);
  }

  getUserById(id: number): Observable<User>{
    return this.http.get<User>(this.serverUrl + this.userUrl + '?id=' + id, this.httpOptions);
  }

  getUserByName(name: string): Observable<User>{
    return this.http.get<User>(this.serverUrl + this.userUrl + '?name=' + name, this.httpOptions);
  }

  getFriends(): Observable<User[]>{
    return this.http.get<User[]>(this.serverUrl + this.friendsUrl, this.httpOptions);
  }

  deleteFriend(id: number): Observable<User>{
    return this.http.delete<User>(this.serverUrl + this.friendsUrl + '/' + id, this.httpOptions);
  }

  getFriendRequests(): Observable<FriendRequest[]>{
    return this.http.get<FriendRequest[]>(this.serverUrl + this.friendsUrl + this.friendrequestUrl, this.httpOptions);
  }

  sendFriendRequestByName(name: string): Observable<any>{
    return this.http.post(this.serverUrl + this.friendsUrl + this.friendrequestUrl, { name: name}, this.httpOptionsObject);
  }

  sendFriendRequestById(id: number): Observable<any>{
    return this.http.post(this.serverUrl + this.friendsUrl + this.friendrequestUrl, { id: id}, this.httpOptionsObject);
  }

  acceptFriendRequest(id: number): Observable<FriendRequest> {
    return this.http.put<FriendRequest>(this.serverUrl + this.friendsUrl + this.friendrequestUrl + '/' + id, { status: 1 }, this.httpOptionsObject);
  }

  declineFriendRequest(id: number): Observable<FriendRequest> {
    return this.http.put<FriendRequest>(this.serverUrl + this.friendsUrl + this.friendrequestUrl + '/' + id, { status: -1 }, this.httpOptionsObject);
  }

}
