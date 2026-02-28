import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Task, STATUS_LABELS } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() delete = new EventEmitter<number>();
  @Output() statusChange = new EventEmitter<{ id: number; status: number }>();

  statusLabels = STATUS_LABELS;

  onDelete() {
    if (confirm('Delete this task?')) {
      this.delete.emit(this.task.taskId);
    }
  }

  onStatusChange(newStatus: number) {
    this.statusChange.emit({ id: this.task.taskId, status: newStatus });
  }

  formatDate(date: string): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric'
    });
  }
}
