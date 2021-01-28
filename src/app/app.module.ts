import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { GameComponent } from './game/game.component';
import { StartpageComponent } from './startpage/startpage.component';
import { FriendsComponent } from './friends/friends.component';


const routes: Routes = [
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: '', redirectTo: '/startpage', pathMatch: 'full'},
  {path: 'profile', component: ProfileComponent},
  {path: 'game', component: GameComponent},
  {path: 'startpage', component: StartpageComponent},
  {path: 'friends', component: FriendsComponent}
  ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ProfileComponent,
    GameComponent,
    StartpageComponent,
    FriendsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {useHash: true}),
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
