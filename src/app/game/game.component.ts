import {DeclareVarStmt} from '@angular/compiler';
import {Component, OnInit} from '@angular/core';
import {isObservable} from 'rxjs/internal-compatibility';
import {ActivatedRoute, Router} from '@angular/router';
import {GameService} from '../game.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  //Definition for game elements

  everythingOK = true;
  gameId = 1;

  //Counter
  questionCount: number;
  questionCountUi: number;

  //all Questions and Answers
  categoryName: string;
  questions;

  //current Question and Answers
  questionText: string;
  answers: string[] = ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'];
  correctAnswer: number;

  //current user input
  clicked: boolean = false;         // gibt an ob schon eine antwort ausgewählt wurde
  clickedCorrect: boolean = false;  // gibt an ob die ausgewählte antwort correct ist
  showWrong: number = -1;           // gibt die antwortnummer an wenn falsch geklickt wurde, ums rot darzustellen

  //total user results
  userResult: boolean[] = [false, false, false, false];
  scored: number;

  constructor(private route: Router, private gameService: GameService, private activatedRoute: ActivatedRoute) {
    this.everythingOK = true;
    this.activatedRoute.paramMap.subscribe(params => {
      let gameId = params.get('id');
      if (gameId === undefined) {
      } else {
        this.gameId = parseInt(params.get('id'), 10);

      }
      console.log('id: ' + this.gameId);
    });

  }

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(){
    this.gameService.getQuestions(this.gameId).subscribe(res => {
      this.questions = JSON.parse(res.questions);
      this.questionCount = res.numberQuestions;
      this.categoryName = res.categoryName;
      this.questionCountUi = 0; // Arrays fangen mit wert 0 an, deswegen einfachheitshalber auch counter bei 0 anfangen
      this.scored = 0;
      /*this.gameService.updateGameStatus(1, this.gameId).subscribe(res => {
      }, error => {
      });*/
      this.showQuestion();
    }, err => {
      this.everythingOK = false;
    });
  }

  //Method to lock in the answer

  score(answer: number) {
    let clickedAnswer = answer;
    this.clicked = true;
    this.clickedCorrect = (clickedAnswer == this.correctAnswer);
    if (!this.clickedCorrect) {
      this.showWrong = clickedAnswer;
    } else {
      this.scored++;
      this.userResult[this.questionCountUi] = true;
    }
    this.questionCount--;
    this.questionCountUi++;
  }

  //Method to continue -> either next question or dashboard

  continue() {
    if (this.questionCount > 0) {
      // reset UI
      this.clicked = false;
      this.showWrong = -1;
      // show next question
      this.showQuestion();
    } else {
      this.gameService.updateGameStatus(2, this.gameId).subscribe(res => {
      }, error => {
      });
      this.route.navigateByUrl('/dashboard');
    }
  }

  showQuestion() {
    console.log('show Question');
    let currentQuestion = this.questions[this.questionCountUi];
    console.log('current question: ' + currentQuestion);
    this.questionText = currentQuestion.text;
    console.log('text: ' + this.questionText);
    for (let i = 0; i < 4; i++) {
      this.answers[i] = currentQuestion.answers[i+1];
    }
    console.log(this.answers);
    this.correctAnswer = currentQuestion.correct-1;
    console.log(this.correctAnswer);
  }

}

