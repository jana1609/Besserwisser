import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  /**
   * TODO
   * IF VALID INPUT -> PUT HTTP REQUEST
   * INVALID NO CHANGE 
   * GET INPUT FROM TEXTINPUT
   */

  updateUsername(){
    window.alert('This will update the username.');

  }

  /**
   * TODO
   * CHECK IF VALID INPUT -> PASSWORD RULES
   * CHECK IF NEW PASSWORD == CONFIRM PASSWORD 
   * THEN UPDATE 
   * IF INVALID -> ERROR HANDLING 
   */

  updatePassword(){
    window.alert('This will change the password.');

  }

  /**
   * CHECK IF PASSWORD INPUT IS CORRECT 
   * DELETE USER -> DELETE HTTP REQUEST
   */

  deleteUser(){
    window.alert('This will delete the userinfo.');

  }

  constructor() { }

  ngOnInit(): void {
  }

}
