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
  categoryCount: number;

  //all Questions and Answers
  categoryName: string;
  questions;
  categories;

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
    //this.gameService.setQuestions(this.gameId).subscribe(res => {console.log("question set worked");}, err => {console.log("questions set ERROR");});
    this.gameService.getQuestions(this.gameId).subscribe(res => {
      console.log(res.categoriesInJson);
      this.categories = JSON.parse(res.categoriesInJson);
      
      //this.questions = JSON.parse(res.questions);
      this.questionCount = 3;
      this.categoryName = res.categoryName;
      this.categoryCount = res.numberCategories;
      this.questionCountUi = 0; // Arrays fangen mit wert 0 an, deswegen einfachheitshalber auch counter bei 0 anfangen
      this.scored = 0;
      /*this.gameService.updateGameStatus(1, this.gameId).subscribe(res => {
      }, error => {
      });*/
      this.showQuestion(this.questionCount -1, this.categoryCount -1);
    }, err => {
      console.log(err.message);
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
  
      if(this.categoryCount > 0 && this.questionCount > 0){
        this.clicked = false;
        this.showWrong = -1;
        this.showQuestion(this.questionCount -1, this.categoryCount -1);    
      }
      else{
        if(this.questionCount === 0 && this.categoryCount > 0){
          this.categoryCount--;
          this.questionCount = 3
        }else{
          this.gameService.updateGameStatus(2, this.gameId).subscribe(res => {
          }, error => {
          });
          window.alert('Erreichte Punkte: ' + this.scored + 'pkt');
          this.route.navigateByUrl('/dashboard');
        }
        
      }
     
    
  }

  showQuestion(question: number, category: number) {
    console.log('show Question');
    let currentQuestion = this.categories[category].questions[question];
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

