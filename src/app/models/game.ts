import {User} from './user';

export interface Game {
  id: number;
  questionCounter: number;
  currentPlayerId: number;
  categories: string[];
  users: User[];
  status: number;
}
