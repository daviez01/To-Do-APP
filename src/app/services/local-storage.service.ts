import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  
    storeTasks(tasks: string[]) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

  
    getTasks(): string[] {
      const tasks = localStorage.getItem('tasks');
      return tasks ? JSON.parse(tasks) : [];
    }
  
    deleteTask(task: string) {
      const tasks = this.getTasks();
      const taskIndex = tasks.indexOf(task);
      if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
      }
      this.storeTasks(tasks);
    }
  
}
