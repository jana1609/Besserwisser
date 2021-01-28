import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {User} from '../models/user';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {UserService} from '../user.service';
import {FriendRequest} from '../models/friendrequest';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  searchedUsers$: Observable<User[]>;
  private searchTerms = new Subject<string>();
  friendRequests: FriendRequest[] = [];
  friends: User[] = [];
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.loggedIn;
    if (this.user){
      this.updateFriendRequests();
      this.updateFriends();
    }
    this.searchedUsers$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.userService.searchForUsers(term))
    );
  }

  searchForUsersByName(term: string): void{
    this.searchTerms.next(term);
  }

  updateFriendRequests(): void{
    this.userService.getFriendRequests().subscribe(result => this.friendRequests = result);
  }

  updateFriends(): void{
    this.userService.getFriends().subscribe(result => this.friends = result);
  }

  deleteFriend(id: number): void{
    this.userService.deleteFriend(id).subscribe(result => this.removeFriendFromList(result.id));
  }

  sendFriendRequestByName(name: string): void{
    this.userService.sendFriendRequestByName(name).subscribe();
  }

  sendFriendRequestById(id: number): void{
    this.userService.sendFriendRequestById(id).subscribe();
  }

  acceptFriendRequest(id: number): void{
    this.userService.acceptFriendRequest(id).subscribe(result =>  {
      this.removeFriendRequestFromList(result.id);
      this.addFriendToList(result);
    });
  }

  declineFriendRequest(id: number): void{
    this.userService.declineFriendRequest(id).subscribe(result => {
      this.removeFriendRequestFromList(result.id);
    });
  }

  addFriendToList(request: FriendRequest): void{
    this.friends.push(request.sender);
  }

  removeFriendRequestFromList(id: number): void{
    const index = this.friendRequests.findIndex(friendRequest => friendRequest.id === id);
    if (index > -1){
      this.friendRequests.splice(index, 1);
    }
  }

  removeFriendFromList(id: number): void{
    const index = this.friends.findIndex(friend => friend.id === id);
    if (index > -1){
      this.friends.splice(index, 1);
    }
  }
}
