import { DeclareVarStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  //Definition for game elements 
  
  questiontext: string = 'Questiontext';
  answers: string[] = ['Answer 1','Answer 2','Answer 3','Answer 4'];
  answerUser: string;
  correctAnswer: string;

  constructor() { }

  ngOnInit(): void {
  }

  //Method to lock in the answer

  score(){

    /**
     * TODO
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
     * Maybe send information to server here (?)
     */

  }

}

