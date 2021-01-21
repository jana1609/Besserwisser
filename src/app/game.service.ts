import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Game} from './models/game';
import {Invite} from './models/invite';
import {InviteRes} from './models/inviteres';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private serverUrl = 'https://besserwisser.herokuapp.com/';
  private inviteUrl = 'invite/';
  private gameUrl = 'game/';

  private httpOptionsObject = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.userService.token })
  };

  private httpOptions = {
    headers: new HttpHeaders({'Authorization': this.userService.token})
  };

  constructor(private http: HttpClient, private userService: UserService) { }

  getGamesOfUser(): Observable<Game[]> {
    return this.http.get<Game[]>(this.serverUrl + this.gameUrl, this.httpOptions);
  }

  getInvitesOfUser(): Observable<Invite[]>{
    return this.http.get<Invite[]>(this.serverUrl + this.inviteUrl, this.httpOptions);
  }

  acceptInvite(id: number): Observable<InviteRes> {
    return this.http.patch<InviteRes>(this.serverUrl + this.inviteUrl + id, { status: 1 }, this.httpOptionsObject);
  }

  declineInvite(id: number): Observable<InviteRes> {
    return this.http.patch<InviteRes>(this.serverUrl + this.inviteUrl + id, { status: -1 }, this.httpOptionsObject);
  }

  getGame(id: number): Observable<Game>{
    return this.http.get<Game>(this.serverUrl + this.gameUrl + id, this.httpOptions);
  }

  createNewGame(ids: number[], categories: number[]): Observable<Game>{
    return this.http.post<Game>(this.serverUrl + this.gameUrl, { users: ids, categories: categories}, this.httpOptionsObject);
  }
}
