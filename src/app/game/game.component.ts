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


    //var methods = (<HTMLInputElement[]><any>document.getElementsByName("answer"))[0];
    /*var methods = document.getElementsByName("name");
    for(var i=0; i<methods.length; i++){
      if(methods[i].checked == true)) 

    }*/
    /*var form = document.getElementsByTagName(form);
    var inputs = form.getElementsByTagName(inputs);
    for (var i = 0; i < inputs.length; ++i){
      if (inputs[i].checked){
        score++;
      }
    }*/

    /*var options = document.getElementsByName('answer')
    var option_value;

    for(var i = 0; i < options.length; i++){
      if (options[i].checked){
        option_value = options[i].value;
      }
    }*/

    //Checked not available - maybe multiple radio buttons causing the error 
  
    window.alert('Your score:' +score);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
