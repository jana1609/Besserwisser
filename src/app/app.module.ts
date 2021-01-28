import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Routes, RouterModule } from '@angular/router';

import { NgModule, OnInit } from '@angular/core';
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
import { AdminComponent } from './admin/admin.component';
import { KeysPipe } from './keys.pipe';
import { QuestionEditDialog } from './questioneditdialog/questioneditdialog.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { ConfirmDialog } from './confirm-dialog/confirm-dialog.component';


const routes: Routes = [
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: '', redirectTo: '/startpage', pathMatch: 'full'},
  {path: 'profile', component: ProfileComponent},
  {path: 'game', component: GameComponent},
  {path: 'startpage', component: StartpageComponent},
  { path: 'friends', component: FriendsComponent },
  { path: 'admin', component: AdminComponent }
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
    FriendsComponent,
    AdminComponent,
    KeysPipe,
    QuestionEditDialog,
    ConfirmDialog
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
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
  ],
  entryComponents: [
    QuestionEditDialog,
    ConfirmDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
