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
    // return this.http.get<Game[]>(this.serverUrl + this.gameUrl, this.httpOptions);
    return of([{ id: 1, currentPlayerId: 1, questionCounter: 3, categories: [ 'Allgemeinwissen', 'Geschichte', 'Wissenschaft' ], users: [ {id: 1, name: 'user1'}, { id: 2, name: 'user2' } ], status: 1},
      { id: 2, currentPlayerId: 2, questionCounter: 3, categories: [ 'Allgemeinwissen' ], users: [ {id: 1, name: 'user1'}, { id: 3, name: 'user3' } ], status: 1},
      { id: 3, currentPlayerId: 0, questionCounter: 3, categories: [ 'Geschichte'], users: [ {id: 1, name: 'user1'}, {id: 3, name: 'user3'}, { id: 4, name: 'user4' } ], status: 0}]);
  }

  getInvitesOfUser(): Observable<Invite[]>{
    // return this.http.get<Invite[]>(this.serverUrl + this.inviteUrl, this.httpOptions);
    return of([{ id: 1, gameId: 4, userId: 1, names: ['user1', 'user2', 'user4'], categories: ['Kultur']}]);
  }

  acceptInvite(id: number): Observable<InviteRes> {
    // return this.http.patch<InviteRes>(this.serverUrl + this.inviteUrl + id, { status: 1 }, this.httpOptionsObject);
    return of({id: 1, gameId: 4});
  }

  declineInvite(id: number): Observable<InviteRes> {
    // return this.http.patch<InviteRes>(this.serverUrl + this.inviteUrl + id, { status: -1 }, this.httpOptionsObject);
    return of({id: 1, gameId: 4});
  }

  getGame(id: number): Observable<Game>{
    // return this.http.get<Game>(this.serverUrl + this.gameUrl + id, this.httpOptions);
    if (id === 4){
      return of({ id: 4, currentPlayerId: 1, questionCounter: 3, categories: [ 'Kultur'], users: [ {id: 1, name: 'user1'}, {id: 2, name: 'user2'}, { id: 4, name: 'user4' } ], status: 0});
    }
    return null;
  }

  createNewGame(ids: number[], categories: number[]): Observable<Game>{
    // return this.http.post<Game>(this.serverUrl + this.gameUrl, { users: ids, categories: categories}, this.httpOptionsObject);
    return of({ id: 5, currentPlayerId: 0, questionCounter: 3, categories: [ 'Sport'], users: [ {id: 1, name: 'user1'}, {id: 2, name: 'user2'}], status: 0});
  }
}
