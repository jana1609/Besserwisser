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

  constructor(private http: HttpClient, private userService: UserService) { }

  getGamesOfUser(): Observable<Game[]> {
    return this.http.get<Game[]>(this.serverUrl + this.gameUrl, this.userService.httpOptions);
  }

  getInvitesOfUser(): Observable<Invite[]>{
    return this.http.get<Invite[]>(this.serverUrl + this.inviteUrl, this.userService.httpOptions);
  }

  acceptInvite(id: number): Observable<InviteRes> {
    return this.http.patch<InviteRes>(this.serverUrl + this.inviteUrl + id, { status: 1 }, this.userService.httpOptionsObject);
  }

  declineInvite(id: number): Observable<InviteRes> {
    return this.http.patch<InviteRes>(this.serverUrl + this.inviteUrl + id, { status: -1 }, this.userService.httpOptionsObject);
  }

  getGame(id: number): Observable<Game>{
    return this.http.get<Game>(this.serverUrl + this.gameUrl + id, this.userService.httpOptions);
  }

  createNewGame(ids: number[], categories: number[]): Observable<Game>{
    return this.http.post<Game>(this.serverUrl + this.gameUrl, { users: ids, categories: categories}, this.userService.httpOptionsObject);
  }
}
