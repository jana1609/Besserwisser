import { Component, OnInit } from '@angular/core';
import { GameService} from '../game.service';
import { User } from '../models/user';
import { Game } from '../models/game';
import {Observable, pipe, Subject} from 'rxjs';
import {UserService} from '../user.service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Invite} from '../models/invite';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  searchedUsers$: Observable<User[]>;
  private searchTerms = new Subject<string>();
  selectedUsers: User[] = [];
  user: User;
  games: Game[];
  invites: Invite[];

  constructor(private gameService: GameService, private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.loggedIn;
    this.user = {id: 1, name: 'myNameIsAeyil'}; // TODO: Remove with log in
    if (this.user){
      this.updateInvites();  // does this work correctly?
      this.updateGames();
    }
    this.searchedUsers$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.userService.searchForUsers(term))
    );
  }

  private updateInvites(): void{
    this.gameService.getInvitesOfUser(this.user.id).subscribe(invites => this.invites = invites);
  }

  updateGames(): void{
    this.gameService.getGamesOfUser(this.user.id).subscribe(games => this.games = games);
  }

  private addGame(game: Game): void{
    this.games.push(game);
  }

  searchForUsersByName(term: string): void{
    this.searchTerms.next(term);
  }

  addUserToNewGameByName(name: string): void{
    this.userService.getUserByName(name).subscribe( user => this.addUser(user));
  }

  addUserToNewGameById(id: number): void{
    this.userService.getUserById(id).subscribe(user => this.addUser(user));
  }

  private addUser(user: User): void{
    for (const existingUser of this.selectedUsers){
      if (user.id === existingUser.id){
        return;
      }
    }
    if (user.id === this.user.id){
      return;
    }
    this.selectedUsers.push(user);
  }

  removeUserFromNewGame(id: number): void{
    for (const user of this.selectedUsers){
      if (user.id === id){
        this.selectedUsers.splice(this.selectedUsers.indexOf(user), 1);
        break;
      }
    }
  }

  createNewGame(): void{
    if (this.selectedUsers.length > 0) {
      const playerIds: number[] = [];
      playerIds.push(this.user.id);
      for (const user of this.selectedUsers) {
        playerIds.push(user.id);
      }
      this.selectedUsers = [];
      this.gameService.createNewGame(playerIds).subscribe(game => this.addGame(game));
    }
  }

  acceptInvite(id: number): void{
    this.gameService.acceptInvite(id).subscribe(invite => {
      this.removeInvite(invite); this.gameService.getGame(invite.gameId).subscribe(game => this.addGame(game));
    });
  }

  declineInvite(id: number): void{
    this.gameService.declineInvite(id).subscribe(invite => this.removeInvite(invite));
  }

  removeInvite(invite: Invite): void{
    console.log('Hello');
    const index = this.invites.findIndex(invitePresent => invitePresent.id === invite.id);
    if (index > -1){
      this.invites.splice(index, 1);
    }
  }
}
