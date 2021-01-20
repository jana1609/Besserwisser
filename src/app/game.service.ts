import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Game} from './models/game';
import {Invite} from './models/invite';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  getGamesOfUser(id: number): Observable<Game[]> {
    // TODO: implement Servercall
    return of([
      { id: 1, questionCounter: 9, categories: ['Wissenschaft', 'Leben'], currentPlayerId: 1, players: [
          { user: {id: 1, name: 'myNameIsAeyil'}, answers: [ 1, 1, 1, -1, -1, 1, 0, 0, 0]},
          { user: {id: 2, name: 'edward101'}, answers: [ 1, -1, 1, -1, -1, -1, 0, 0, 0]},
          { user: {id: 3, name: 'jürgen2'}, answers: [ 1, 1, -1, 1, 1, 1, 0, 0, 0 ]},
          { user: {id: 4, name: 'andreas'}, answers: [ 1, 1, -1, 0, 0, 0, 0, 0, 0 ]}
        ], status: 1 },
      { id: 2, questionCounter: 15, categories: ['Wissenschaft', 'Leben', 'Geschichte'], currentPlayerId: 3, players: [
          { user: {id: 1, name: 'myNameIsAeyil'}, answers: [ 1, -1, -1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, ]},
          { user: {id: 3, name: 'jürgen2'}, answers: [ 1, -1, 1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, ]},
        ], status: 1 }
      ]
    );
  }

  getInvitesOfUser(id: number): Observable<Invite[]>{
    return of([ {id: 1, gameId: 1, userId: 1, names: ['Herbert', 'Angelika', 'Ferdinand'], categories: ['Test', 'Test2']}]);
  }

  acceptInvite(id: number): Observable<Invite> {
    return of({id: 1, gameId: 1, userId: 1, names: ['Herbert', 'Angelika', 'Ferdinand'], categories: ['Test', 'Test2']});
  }

  declineInvite(id: number): Observable<Invite> {
    return of({id: 1, gameId: 1, userId: 1, names: ['Herbert', 'Angelika', 'Ferdinand'], categories: ['Test', 'Test2']});
  }

  getGame(id: number): Observable<Game>{
    return of({ id: 2, questionCounter: 15, categories: ['Wissenschaft', 'Leben', 'Geschichte'], currentPlayerId: 3, players: [
        { user: {id: 1, name: 'myNameIsAeyil'}, answers: [ 1, -1, -1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, ]},
        { user: {id: 3, name: 'jürgen2'}, answers: [ 1, -1, 1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, ]},
      ], status: 1 });
  }

  createNewGame(ids: number[]): Observable<Game>{
    return of(
      { id: 2, questionCounter: 15, categories: ['Wissenschaft', 'Leben', 'Geschichte'], currentPlayerId: 3, players: [
        { user: {id: 1, name: 'myNameIsAeyil'}, answers: [ 1, -1, -1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, ]},
        { user: {id: 3, name: 'jürgen2'}, answers: [ 1, -1, 1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, ]},
      ], status: 0 });
  }
}
