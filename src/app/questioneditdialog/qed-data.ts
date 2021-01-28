import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { Question } from '../models/question';

export interface QEDData {
  categories: Observable<Array<Category>>;
  question: Question;
  isNew: boolean;
}
