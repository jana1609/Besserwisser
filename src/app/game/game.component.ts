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

  // man könnte die Antworten als buttons diplayen, und wenn eine Antwort geklickt wurde, ruft man score auf (nicht über einen extra btn)

  questionCount: number;
  questionText: string = 'Questiontext';
  answers: string[] = ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'];
  answerUser: string;
  correctAnswer: number = 2;

  clicked: boolean = false; // gibt an ob schon eine antwort ausgewählt wurde
  clickedCorrect: boolean = false; // gibt an ob die ausgewählte antwort correct ist
  showWrong: number = -1; // wie showCorrect nur für falsch geklickte

  constructor(private route: Router) {
  }

  ngOnInit(): void {
    this.questionCount = 3;
    /**
     * TODO
     * von dashboard übergeben bekommen: game id und category
     * set game status to running in db
     * get number of questions (x) from game in db
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
    this.questionCount--;

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
      this.clicked = false;
      this.showWrong = -1;
      //todo show next Question
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

  }

}

