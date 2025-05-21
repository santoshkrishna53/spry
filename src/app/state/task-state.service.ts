import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class TaskStateService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  get tasks(): Task[] {
    return this.tasksSubject.getValue();
  }

  private updateTasks(tasks: Task[]) {
    this.tasksSubject.next(tasks);
  }

  addTask(task: Omit<Task, 'id'>) {
    const newTask: Task = { ...task, id: uuidv4() };
    this.updateTasks([...this.tasks, newTask]);
  }

  editTask(updatedTask: Task) {
    const updated = this.tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    this.updateTasks(updated);
  }

  deleteTask(id: string) {
    this.updateTasks(this.tasks.filter(task => task.id !== id));
  }
}