export interface Task {
  taskId: number;
  title: string;
  description: string;
  status: number;       // 0 = To Do, 1 = In Progress, 2 = Done
  dueDate: string;      // ISO date string
  userId: number;
  userName: string;
  createDate: string;
  modifiedDate: string;
}

export enum TaskStatus {
  TODO = 0,
  IN_PROGRESS = 1,
  DONE = 2
}

export const STATUS_LABELS: Record<number, string> = {
  [TaskStatus.TODO]: 'To Do',
  [TaskStatus.IN_PROGRESS]: 'In Progress',
  [TaskStatus.DONE]: 'Done'
};
