import {DeclareVarStmt} from '@angular/compiler';
import {Component, OnInit} from '@angular/core';
import {isObservable} from 'rxjs/internal-compatibility';
import {Router} from '@angular/router';
import {GameService} from '../game.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  //Definition for game elements

  //Counter
  questionCount: number;
  questionCountUi: number;

  //all Questions and Answers
  categoryName: string;
  questions = {0: {answers: {0:'Answer 1', 1:'Answer 2', 2:'Answer 3', 3:'Answer 4'}},
    1: {answers: {0:'Answer 1', 1:'Answer 2', 2:'Answer 3', 3:'Answer 4'}},
    2: {answers: {0:'Answer 1', 1:'Answer 2', 2:'Answer 3', 3:'Answer 4'}},
    3: {answers: {0:'Answer 1', 1:'Answer 2', 2:'Answer 3', 3:'Answer 4'}},};

  //current Question and Answers
  questionText: string;
  answers: string[] = ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'];
  correctAnswer: number;

  //current user input
  clicked: boolean = false;         // gibt an ob schon eine antwort ausgewählt wurde
  clickedCorrect: boolean = false;  // gibt an ob die ausgewählte antwort correct ist
  showWrong: number = -1;           // gibt die antwortnummer an wenn falsch geklickt wurde, ums rot darzustellen

  //total user results
  userResult: boolean[] = [false, false, false, false]
  scored: number;

  constructor(private route: Router, private gameService: GameService) {}

  ngOnInit(): void {
    let gameId = 0;
    //todo get gameId
    this.gameService.getQuestions(gameId).subscribe(res => {
      console.log("in subscribe");
      this.questions = res.questions;
      this.questionCount = res.numberQuestions;
      this.categoryName = res.categoryName;
      this.questionCount = 3;
      this.questionCountUi = 0; // Arrays fangen mit wert 0 an, deswegen einfachheitshalber auch counter bei 0 anfangen
      this.scored = 0;
      this.showQuestion();
    }, err => {
      this.printErr();
    });

    /**
     * TODO
     * set game status to running in db
     * get questionCount from db
     * get x random questions for the category (make Array with the x questions)
     */
  }

  //Method to lock in the answer

  score(answer: number) {
    let clickedAnswer = answer;
    this.clicked = true;
    this.clickedCorrect = (clickedAnswer == this.correctAnswer);
    if (!this.clickedCorrect) {
      this.showWrong = clickedAnswer;
    }
    else{
      this.scored++;
      this.userResult[this.questionCountUi] = true;
    }
    this.questionCount--;
    this.questionCountUi++;

    /**
     * TODO
     * questionCount --
     * Check if answer is correct
     * Send information to server
     * Show user the correct answer
     * Enable next button to let the user continue
     */

  }

  //Method to continue -> either next question or dashboard

  continue() {
    if (this.questionCount > 0) {
      // reset UI
      this.clicked = false;
      this.showWrong = -1;
      // show next question
      this.showQuestion();
    }
    else this.route.navigateByUrl('/dashboard');

    /**
     * TODO
     * Move user to next question or back to the dashboard
     * if questioncount > 0 showQuestion, else finish
     * set game status to finished in db
     * Maybe send information to server here (?)
     */
  }

  showQuestion() {
    console.log('show Question');
    let currentQuestion = this.questions[this.questionCountUi];
    console.log('current question: ' + currentQuestion);
    this.questionText = currentQuestion.text;
    console.log('text: ' + this.questionText);
    for(let i=0;i<4;i++){
      this.answers[i] = currentQuestion.answers[i];
    }
    this.correctAnswer = currentQuestion.correct;
  }

  printErr() {
    //todo
  }

}

