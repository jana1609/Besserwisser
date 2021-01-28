import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog.component';
import { GameService } from '../game.service';
import { Category } from '../models/category';
import { Question, QuestionDTO } from '../models/question';
import { QuestionEditDialog } from '../questioneditdialog/questioneditdialog.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  isAdmin = false;

  categories: Observable<Array<Category>>;
  questions: Observable<Array<Question>>;
  filterState: Object;
  filtersActive: boolean;

  constructor(private adminService: AdminService, private editDialog: MatDialog, private confirmDialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.categories = this.adminService.getCategories();
    this.questions = this.adminService.getQuestions();
    this.filterState = {};
  }

  onFilterUpdate(event: MatCheckboxChange): void {
    this.filterState[event.source.name] = event.checked;
    this.filtersActive = Object.keys(this.filterState).some(key => this.filterState[key]);
  }

  onOpenEditor(question: Question) {
    let dialogRef = this.editDialog.open(QuestionEditDialog, {
      width: '80%',
      data: {
        question: question === null ? {
          answers: { '1': '', '2': '', '3': '', '4': '' }
        } : question,
        categories: this.categories,
        isNew: question === null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      let instance = dialogRef.componentInstance;

      if (instance.shouldSave) {
        let questionData: QuestionDTO = {
          id: instance.data.question.id,
          categoryId: instance.data.question.categoryId,
          correct: instance.data.question.correct,
          text: instance.data.question.text.trim(),
          answers: ''
        };

        questionData.answers = JSON.stringify(instance.data.question.answers);
        questionData.answers = questionData.answers.startsWith('{') ? questionData.answers.substring(1) : questionData.answers;
        questionData.answers = questionData.answers.endsWith('}') ? questionData.answers.substring(0, questionData.answers.length - 1) : questionData.answers;

        if (instance.data.isNew) {
          delete questionData.id;
        }

        this.adminService[instance.data.isNew ? 'postQuestion' : 'updateQuestion'](questionData).subscribe(() => {
          this.snackBar.open('Erfolgreich', 'Frage', { duration: 4000 });
          this.questions = this.adminService.getQuestions();
        });
        instance.shouldSave = false;
      }
    });
  }

  onDeleteQuestionClick(question: Question): void {
    let dialogRef = this.confirmDialog.open(ConfirmDialog, {
      width: '60%',
      data: 'Wollen Sie die Frage wirklich löschen?'
    });

    dialogRef.afterClosed().subscribe(() => {
      let instance = dialogRef.componentInstance;

      if (instance.confirmed) {
        this.adminService.deleteQuestion(question).subscribe(() => {
          this.snackBar.open('Erfolgreich', 'Frage', { duration: 4000 });
          this.questions = this.adminService.getQuestions();
        });
      }
    });
  }
}

