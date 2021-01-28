import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuestionEditDialog } from '../questioneditdialog/questioneditdialog.component';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialog implements OnInit {

  public confirmed: boolean = false;

  constructor(public dialogRef: MatDialogRef<QuestionEditDialog>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
  }

  onClick(confirmed: boolean) {
    this.confirmed = confirmed;

    this.dialogRef.close();
  }
}
