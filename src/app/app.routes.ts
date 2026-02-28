import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./components/task-list/task-list.component')
        .then(c => c.TaskListComponent)
  },
  {
    path: 'tasks/new',
    loadComponent: () =>
      import('./components/task-form/task-form.component')
        .then(c => c.TaskFormComponent)
  },
  {
    path: 'tasks/:id/edit',
    loadComponent: () =>
      import('./components/task-form/task-form.component')
        .then(c => c.TaskFormComponent)
  }
];
