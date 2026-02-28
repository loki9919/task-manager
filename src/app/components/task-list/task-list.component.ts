import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskService } from '../../services/task.service';
import { Task, TaskStatus, STATUS_LABELS } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskCardComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  searchTerm = '';
  loading = true;

  columns = [
    { status: TaskStatus.TODO, label: STATUS_LABELS[TaskStatus.TODO] },
    { status: TaskStatus.IN_PROGRESS, label: STATUS_LABELS[TaskStatus.IN_PROGRESS] },
    { status: TaskStatus.DONE, label: STATUS_LABELS[TaskStatus.DONE] }
  ];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.loading = true;
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load tasks:', err);
        this.loading = false;
      }
    });
  }

  getFilteredTasks(status: number): Task[] {
    return this.tasks
      .filter(t => t.status === status)
      .filter(t =>
        !this.searchTerm ||
        t.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
  }

  onDeleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.taskId !== taskId);
      },
      error: (err) => console.error('Failed to delete task:', err)
    });
  }

  onStatusChange(event: { id: number; status: number }) {
    const task = this.tasks.find(t => t.taskId === event.id);
    if (!task) return;

    this.taskService.updateTask(event.id, { ...task, status: event.status })
      .subscribe({
        next: (updated) => {
          const index = this.tasks.findIndex(t => t.taskId === event.id);
          if (index !== -1) this.tasks[index] = updated;
        },
        error: (err) => console.error('Failed to update status:', err)
      });
  }
}
