import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Besserwisser';
  loggedIn = false;

  constructor(private router: Router, private userService: UserService) {
  }

  logout(){
    this.loggedIn = false;
    this.userService.setToken("");
    this.router.navigateByUrl('/startpage');
  }

}
