import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { TaskStatus, STATUS_LABELS } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  isEditMode = false;
  taskId: number | null = null;
  statusOptions = [
    { value: TaskStatus.TODO, label: STATUS_LABELS[TaskStatus.TODO] },
    { value: TaskStatus.IN_PROGRESS, label: STATUS_LABELS[TaskStatus.IN_PROGRESS] },
    { value: TaskStatus.DONE, label: STATUS_LABELS[TaskStatus.DONE] }
  ];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      description: ['', Validators.maxLength(2000)],
      status: [TaskStatus.TODO, Validators.required],
      dueDate: ['']
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.taskId = +id;
      this.loadTask(this.taskId);
    }
  }

  loadTask(id: number) {
    this.taskService.getTask(id).subscribe({
      next: (task) => {
        if (!task) { this.router.navigate(['/tasks']); return; }
        this.taskForm.patchValue({
          title: task.title,
          description: task.description,
          status: task.status,
          dueDate: task.dueDate ? task.dueDate.substring(0, 10) : ''
        });
      },
      error: () => this.router.navigate(['/tasks'])
    });
  }

  onSubmit() {
    if (this.taskForm.invalid) return;

    const formValue = this.taskForm.value;

    if (this.isEditMode && this.taskId) {
      this.taskService.updateTask(this.taskId, formValue).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: (err) => console.error('Failed to update task:', err)
      });
    } else {
      this.taskService.createTask(formValue).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: (err) => console.error('Failed to create task:', err)
      });
    }
  }

  onCancel() {
    this.router.navigate(['/tasks']);
  }
}
