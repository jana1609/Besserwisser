import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Game} from './models/game';
import {Invite} from './models/invite';
import {InviteRes} from './models/inviteres';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserService} from './user.service';
import {Category} from './models/category';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private serverUrl = 'https://besserwisser.herokuapp.com';
  private inviteUrl = '/invite/';
  private gameUrl = '/game';
  private categoriesUrl = '/categories';
  private gameplayUrl = '/gameplay';

  private httpOptionsObject = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.userService.token})
  };

  private httpOptions = {
    headers: new HttpHeaders({'Authorization': this.userService.token})
  };

  private setHeaders(token: string): void {
    this.httpOptionsObject = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token})
    };
    this.httpOptions = {
      headers: new HttpHeaders({'Authorization': token})
    };
  }

/*
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Origin': '*',*/

  constructor(private http: HttpClient, private userService: UserService) {
    this.setHeaders(this.userService.token);
  }

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
    return this.http.put<InviteRes>(this.serverUrl + this.inviteUrl + '/' + id, { status: 1 }, this.userService.httpOptionsObject);
  }

  declineInvite(id: number): Observable<InviteRes> {
    return this.http.put<InviteRes>(this.serverUrl + this.inviteUrl + '/' + id, { status: -1 }, this.userService.httpOptionsObject);
  }

  getGame(id: number): Observable<Game>{
    return this.http.get<Game>(this.serverUrl + this.gameUrl + '/' + id, this.userService.httpOptions);
  }

  createNewGame(ids: number[], categories: number[]): Observable<Game>{
    return this.http.post<Game>(this.serverUrl + this.gameUrl, { users: ids, categories: categories}, this.userService.httpOptionsObject);
  }

  getQuestions(gameId: number): Observable<any> {
    this.setHeaders(this.userService.token);
    return this.http.post<any>(this.serverUrl + this.gameplayUrl, {gameId: gameId}, this.httpOptionsObject);
  }

  updateGameStatus(status: number, gameId: number): Observable<any> {
    this.setHeaders(this.userService.token);
    return this.http.post<any>(this.serverUrl + 'gameplay/' + 'status', {status: status, id: gameId}, this.httpOptionsObject);
  }

}
