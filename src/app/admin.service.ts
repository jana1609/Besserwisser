import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { Category } from './models/category';
import { Question, QuestionDTO } from './models/question';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private serverUrl = 'https://besserwisser.herokuapp.com';
  private adminUrl = '/admin';

  private httpOptionsObject = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': UserService.token })
  };

  private httpOptions = {
    headers: new HttpHeaders({ 'Authorization': UserService.token })
  };

  private setHeaders(token: string): void {
    this.httpOptionsObject = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    };
    this.httpOptions = {
      headers: new HttpHeaders({ 'Authorization': token })
    };
  }

  constructor(private http: HttpClient, private userService: UserService) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.serverUrl + this.adminUrl + '/categories', this.userService.httpOptionsObject);
  }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.serverUrl + this.adminUrl + '/questions', this.userService.httpOptionsObject).pipe(map(questions => {
      return questions.map(question => {
        question.answers = question.answers ? JSON.parse('{' + question.answers + '}') : {};
        question.correct = '' + question.correct;

        return question;
      });
    }));
  }

  updateQuestion(question: QuestionDTO): Observable<any> {
    return this.http.put<any>(this.serverUrl + this.adminUrl + '/questions', question, this.userService.httpOptionsObject);
  }

  postQuestion(question: QuestionDTO): Observable<any> {
    return this.http.post<any>(this.serverUrl + this.adminUrl + '/questions', question, this.userService.httpOptionsObject);
  }

  deleteQuestion(question: Question): Observable<void> {
    return this.http.delete<void>(this.serverUrl + this.adminUrl + '/questions/' + question.id, this.userService.httpOptionsObject);
  }
}
