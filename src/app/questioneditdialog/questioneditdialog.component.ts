import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Question } from '../models/question';
import { QEDData } from './qed-data';

@Component({
  selector: 'app-questioneditdialog',
  templateUrl: './questioneditdialog.component.html',
  styleUrls: ['./questioneditdialog.component.css']
})
export class QuestionEditDialog implements OnInit {

  public doneEditing: boolean = false;
  public shouldSave: boolean = false;

  constructor(public dialogRef: MatDialogRef<QuestionEditDialog>, @Inject(MAT_DIALOG_DATA) public data: QEDData) { }

  ngOnInit(): void {
  }

  onSaveClick(): void {
    this.dialogRef.close();
    this.doneEditing = true;
    this.shouldSave = true;
  }

  onCancelClick(): void {
    this.dialogRef.close();
    this.doneEditing = true;
    this.shouldSave = false;
  }

}
