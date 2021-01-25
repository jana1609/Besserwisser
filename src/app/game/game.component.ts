import { DeclareVarStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  //Definition for game elements

  // man könnte die Antworten als buttons diplayen, und wenn eine Antwort geklickt wurde, ruft man score auf (nicht über einen extra btn)

  questioncount: number;
  questiontext: string = 'Questiontext';
  answers: string[] = ['Answer 1','Answer 2','Answer 3','Answer 4'];
  answerUser: string;
  correctAnswer: string;

  constructor() { }

  ngOnInit(): void {

    /**
     * TODO
     * von dashboard übergeben bekommen: game id und category
     * set game status to running in db
     * get number of questions (x) from game in db
     * get x random questions for the category (make Array with the x questions)
     */

  }

  //Method to lock in the answer

  score(){

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

  continue(){

    /**
     * TODO
     * Move user to next question or back to the dashboard
     * if questioncount > 0 showQuestion, else finish
     * set game status to finished in db
     * Maybe send information to server here (?)
     */

  }

  showQuestion(){

  }

}

