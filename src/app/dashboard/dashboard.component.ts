import { Component, OnInit } from '@angular/core';
import { GameService} from '../game.service';
import { User } from '../models/user';
import { Game } from '../models/game';
import {Observable, pipe, Subject} from 'rxjs';
import {UserService} from '../user.service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Invite} from '../models/invite';
import {Category} from '../models/category';

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
  games: Game[] = [];
  invites: Invite[] = [];
  categories: CategoryListItem[];

  constructor(private userService: UserService, private gameService: GameService) { }

  ngOnInit(): void {
    this.user = this.userService.loggedIn;
    if (this.user){
      this.updateInvites();
      this.updateGames();
      this.gameService.getCategories().subscribe(categories => this.updateCategories(categories));
    }
    this.searchedUsers$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.userService.searchForFriendsAndUsers(term))
    );
  }

  updateCategories(categories: Category[]): void{
    this.categories = [];
    for (const cat of categories){
      this.categories.push({ id: cat.id, name: cat.name, selected: false});
    }
  }

  updateInvites(): void{
    this.gameService.getInvitesOfUser().subscribe(invites => this.invites = invites);
  }

  updateGames(): void{
    this.gameService.getGamesOfUser().subscribe(games => this.games = games);
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
      const categoryIds: number[] = [];
      for (const category of this.categories){
        if (category.selected){
          categoryIds.push(category.id);
        }
      }
      this.selectedUsers = [];
      this.gameService.createNewGame(playerIds, categoryIds).subscribe(game => this.addGame(game));
    }
  }

  acceptInvite(id: number): void{
    this.gameService.acceptInvite(id).subscribe(inviteRes => {
      this.removeInvite(inviteRes.id); this.gameService.getGame(inviteRes.gameId).subscribe(game => this.addGame(game));
    });
  }

  declineInvite(id: number): void{
    this.gameService.declineInvite(id).subscribe(inviteRes => this.removeInvite(inviteRes.id));
  }

  removeInvite(id: number): void{
    const index = this.invites.findIndex(invitePresent => invitePresent.id === id);
    if (index > -1){
      this.invites.splice(index, 1);
    }
  }

  toggleCategorySelection(id: number): void{
    const index = this.categories.findIndex(category => category.id === id);
    if (index > -1){
      this.categories[index].selected === true ? this.categories[index].selected = false : this.categories[index].selected = true;
    }
  }
}

interface CategoryListItem{
  id: number;
  name: string;
  selected: boolean;
}
