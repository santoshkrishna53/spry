import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { TaskStateService } from '../../state/task-state.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false
})
export class DashboardComponent {
  filterStatus = '';
  sortAscending = true;

  constructor(
    public taskService: TaskStateService,
    private dialog: MatDialog
  ) {}

  get filteredTasks(): Task[] {
    let tasks = this.taskService.tasks;
    if (this.filterStatus) {
      tasks = tasks.filter(t => t.status === this.filterStatus);
    }
    return tasks.sort((a, b) => {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return this.sortAscending ? dateA - dateB : dateB - dateA;
    });
  }

  getStatusCount(status: string): number {
    return this.taskService.tasks.filter(t => t.status === status).length;
  }

  openTaskForm(task: Task | null = null) {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '400px',
      data: { task }
    });

    dialogRef.afterClosed().subscribe((result: Task) => {
      if (result) {
        task ? this.taskService.editTask(result) : this.taskService.addTask(result);
      }
    });
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }

  sortByDueDate() {
    this.sortAscending = !this.sortAscending;
  }
}
