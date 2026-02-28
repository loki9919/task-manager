import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private storageKey = 'task-manager-tasks';
  private nextId = 1;

  constructor() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      const tasks: Task[] = JSON.parse(stored);
      if (tasks.length > 0) {
        this.nextId = Math.max(...tasks.map(t => t.taskId)) + 1;
      }
    } else {
      // Seed with demo data
      const seed: Task[] = [
        { taskId: 1, title: 'Design wireframes', description: 'Create initial wireframes for the dashboard', status: 0, dueDate: '2026-03-05', userId: 1, userName: 'Khalid', createDate: new Date().toISOString(), modifiedDate: new Date().toISOString() },
        { taskId: 2, title: 'Set up CI/CD pipeline', description: 'Configure GitHub Actions for automated deployment', status: 0, dueDate: '2026-03-10', userId: 1, userName: 'Khalid', createDate: new Date().toISOString(), modifiedDate: new Date().toISOString() },
        { taskId: 3, title: 'Implement auth module', description: 'Add login and registration with JWT tokens', status: 1, dueDate: '2026-03-08', userId: 1, userName: 'Khalid', createDate: new Date().toISOString(), modifiedDate: new Date().toISOString() },
        { taskId: 4, title: 'Write API documentation', description: 'Document all REST endpoints with Swagger', status: 1, dueDate: '2026-03-12', userId: 1, userName: 'Khalid', createDate: new Date().toISOString(), modifiedDate: new Date().toISOString() },
        { taskId: 5, title: 'Database schema design', description: 'Design and review the PostgreSQL schema', status: 2, dueDate: '2026-02-28', userId: 1, userName: 'Khalid', createDate: new Date().toISOString(), modifiedDate: new Date().toISOString() },
      ];
      this.nextId = 6;
      this.save(seed);
    }
  }

  private load(): Task[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  private save(tasks: Task[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }

  getTasks(): Observable<Task[]> {
    return of(this.load());
  }

  getTask(id: number): Observable<Task | undefined> {
    return of(this.load().find(t => t.taskId === id));
  }

  createTask(task: Partial<Task>): Observable<Task> {
    const tasks = this.load();
    const newTask: Task = {
      taskId: this.nextId++,
      title: task.title || '',
      description: task.description || '',
      status: task.status ?? 0,
      dueDate: task.dueDate || '',
      userId: 1,
      userName: 'Khalid',
      createDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString()
    };
    tasks.push(newTask);
    this.save(tasks);
    return of(newTask);
  }

  updateTask(id: number, changes: Partial<Task>): Observable<Task> {
    const tasks = this.load();
    const index = tasks.findIndex(t => t.taskId === id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...changes, modifiedDate: new Date().toISOString() };
      this.save(tasks);
      return of(tasks[index]);
    }
    return of(changes as Task);
  }

  deleteTask(id: number): Observable<void> {
    const tasks = this.load().filter(t => t.taskId !== id);
    this.save(tasks);
    return of(undefined);
  }
}
