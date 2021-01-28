import {User} from './user';

export interface FriendRequest{
  id: number;
  sender: User;
  receiverId: number;
}
