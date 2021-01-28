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

  constructor(private router: Router, public userService: UserService) {
  }

  logout(): void{
    this.userService.setToken('');
    this.userService.setLoggedIn(undefined);
    this.router.navigateByUrl('/startpage');
  }

}
