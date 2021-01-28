import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionEditDialog } from './questioneditdialog.component';

describe('QuestionEditDialog', () => {
  let component: QuestionEditDialog;
  let fixture: ComponentFixture<QuestionEditDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionEditDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionEditDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
