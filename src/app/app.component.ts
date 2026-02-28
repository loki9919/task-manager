import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1><a routerLink="/tasks">Task Manager</a></h1>
        <a routerLink="/tasks/new" class="btn-new">+ New Task</a>
      </header>
      <main>
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    .app-container { max-width: 1200px; margin: 0 auto; padding: 20px; }
    .app-header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 16px 0; border-bottom: 2px solid #e2e8f0; margin-bottom: 24px;
    }
    .app-header h1 a { text-decoration: none; color: #1a202c; }
    .btn-new {
      background: #3182ce; color: white; padding: 10px 20px;
      border-radius: 8px; text-decoration: none; font-weight: 600;
    }
    .btn-new:hover { background: #2c5282; }
  `]
})
export class AppComponent {}
