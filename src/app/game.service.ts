import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Game} from './models/game';
import {Invite} from './models/invite';
import {InviteRes} from './models/inviteres';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {UserService} from './user.service';
import {Category} from './models/category';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private serverUrl = 'https://besserwisser.herokuapp.com/';
  private inviteUrl = 'invite/';
  private gameUrl = 'game/';
  private categoriesUrl = 'categories/';

  constructor(private http: HttpClient, private userService: UserService) { }

  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.serverUrl + this.gameUrl + this.categoriesUrl, this.userService.httpOptionsObject);
  }

  getGamesOfUser(): Observable<Game[]> {
    return this.http.get<Game[]>(this.serverUrl + this.gameUrl, this.userService.httpOptions);
  }

  getInvitesOfUser(): Observable<Invite[]>{
    return this.http.get<Invite[]>(this.serverUrl + this.inviteUrl, this.userService.httpOptions);
  }

  acceptInvite(id: number): Observable<InviteRes> {
    return this.http.put<InviteRes>(this.serverUrl + this.inviteUrl + id, { status: 1 }, this.userService.httpOptionsObject);
  }

  declineInvite(id: number): Observable<InviteRes> {
    return this.http.put<InviteRes>(this.serverUrl + this.inviteUrl + id, { status: -1 }, this.userService.httpOptionsObject);
  }

  getGame(id: number): Observable<Game>{
    return this.http.get<Game>(this.serverUrl + this.gameUrl + id, this.userService.httpOptions);
  }

  createNewGame(ids: number[], categories: number[]): Observable<Game>{
    return this.http.post<Game>(this.serverUrl + this.gameUrl, { users: ids, categories: categories}, this.userService.httpOptionsObject);
  }
}
