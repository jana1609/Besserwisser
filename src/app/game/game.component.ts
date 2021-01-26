import {DeclareVarStmt} from '@angular/compiler';
import {Component, OnInit} from '@angular/core';
import {isObservable} from 'rxjs/internal-compatibility';
import {Router} from '@angular/router';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  //Definition for game elements

  questionCount: number;
  questionCountUi: number;
  scored: number;
  questions = {
    0: {text: 'This is Question 0.', answers: {0: 'Answer 0', 1: 'Answer 1', 2: 'Answer 2', 3: 'Answer 3'}, correct: 0},
    1: {text: 'This is Question 1.', answers: {0: 'Answer 0', 1: 'Answer 1', 2: 'Answer 2', 3: 'Answer 3'}, correct: 3},
    2: {text: 'This is Question 2.', answers: {0: 'Answer 0', 1: 'Answer 1', 2: 'Answer 2', 3: 'Answer 3'}, correct: 1}
  };

  questionText: string;
  answers: string[] = ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'];
  correctAnswer: number;

  clicked: boolean = false; // gibt an ob schon eine antwort ausgewählt wurde
  clickedCorrect: boolean = false; // gibt an ob die ausgewählte antwort correct ist
  showWrong: number = -1; // gibt die antwortnummer an wenn falsch geklickt wurde, ums rot darzustellen

  constructor(private route: Router) {
  }

  ngOnInit(): void {
    this.questionCount = 3;
    this.questionCountUi = 1;
    this.scored = 0;
    this.showQuestion();
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
    }else{
      this.scored++;
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

}

