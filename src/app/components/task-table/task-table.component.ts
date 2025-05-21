import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Task } from '../../models/task.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss'],
  standalone: false
})
export class TaskTableComponent implements OnChanges {
  @Input() tasks: Task[] = [];
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<string>();
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['title', 'description', 'status', 'dueDate', 'actions'];
  dataSource = new MatTableDataSource<Task>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasks']) {
      this.dataSource = new MatTableDataSource(this.tasks)
      this.dataSource.sort = this.sort;
    }
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onEdit(task: Task) {
    this.edit.emit(task);
  }

  onDelete(id: string) {
    this.delete.emit(id);
  }
}
