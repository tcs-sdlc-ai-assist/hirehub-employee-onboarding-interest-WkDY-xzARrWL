import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Submission } from '../../models/submission.model';

@Component({
  selector: 'app-submission-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './submission-table.component.html',
  styleUrls: ['./submission-table.component.css']
})
export class SubmissionTableComponent {
  @Input() submissions: Submission[] = [];
  @Output() edit = new EventEmitter<Submission>();
  @Output() delete = new EventEmitter<Submission>();

  onEdit(submission: Submission): void {
    this.edit.emit(submission);
  }

  onDelete(submission: Submission): void {
    this.delete.emit(submission);
  }
}