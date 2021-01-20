import { DeclareVarStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

import { questions } from '../questions';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  questions = questions;
  
  score(){

    var score: number = 0;
   
    /*Notes:
    - Iterating through Divs created by *NgFor?
    - Iterating with forEach or fori
    - var count = true -> to run an if-statement only once -> set false after statement 
    - document.getElementsByName('answer') -> Problems with parsing as HTMLInputElement -> without no .checked
      - Can't iterate through it because of it -> if it is possible -> if(a[i].checked && a.value == true){score++;}
    */ 

    //Checked not available - maybe multiple radio buttons causing the error 

    //Solution for Demo 

    var a1 = document.getElementById('a1') as HTMLInputElement;
    var a2 = document.getElementById('a2') as HTMLInputElement;
    var a3 = document.getElementById('a3') as HTMLInputElement;
    var a4 = document.getElementById('a4') as HTMLInputElement;

    if (a1.checked && a1.value == 'true'){
      score++;
    }
    if (a2.checked && a2.value == 'true'){
      score++;
    }
    if (a3.checked && a3.value == 'true'){
      score++;
    }
    if (a4.checked && a4.value == 'true'){
      score++;
    }
  
    var a5 = document.getElementById('a5') as HTMLInputElement;
    var a6 = document.getElementById('a6') as HTMLInputElement;
    var a7 = document.getElementById('a7') as HTMLInputElement;
    var a8 = document.getElementById('a8') as HTMLInputElement;

    if (a5.checked && a5.value == 'true'){
      score++;
    }
    if (a6.checked && a6.value == 'true'){
      score++;
    }
    if (a7.checked && a7.value == 'true'){
      score++;
    }
    if (a8.checked && a8.value == 'true'){
      score++;
    }
  
    var a9 = document.getElementById('a9') as HTMLInputElement;
    var a10 = document.getElementById('a10') as HTMLInputElement;
    var a11 = document.getElementById('a11') as HTMLInputElement;
    var a12 = document.getElementById('a12') as HTMLInputElement;

    if (a9.checked && a9.value == 'true'){
      score++;
    }
    if (a10.checked && a10.value == 'true'){
      score++;
    }
    if (a11.checked && a11.value == 'true'){
      score++;
    }
    if (a12.checked && a12.value == 'true'){
      score++;
    }
  
    window.alert('Your score: ' +score);
   
  }

  constructor() { }

  ngOnInit(): void {
  }

}
