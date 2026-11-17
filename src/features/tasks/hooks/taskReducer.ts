import type { Task } from '../types/task';

export type TaskAction =
  | { type: 'task/added'; task: Task }
  | { type: 'task/toggled'; id: Task['id'] }
  | { type: 'tasks/loaded'; tasks: Task[] };

export function taskReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'task/added':
      return [...tasks, action.task];
    case 'task/toggled':
      return tasks.map((task) =>
        task.id === action.id
          ? { ...task, completed: !task.completed }
          : task,
      );
    case 'tasks/loaded':
      return action.tasks;
  }
}
