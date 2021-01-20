import {Player} from './player';

export interface Game {
  id: number;
  questionCounter: number;
  currentPlayerId: number;
  categories: string[];
  players: Player[];
  status: number;
}
