import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: false
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task | null }
  ) {}

  ngOnInit(): void {
    const task = this.data?.task;
    this.taskForm = this.fb.group({
      title: [task?.title || '', Validators.required],
      description: [task?.description || ''],
      dueDate: [task?.dueDate || '', Validators.required],
      status: [task?.status || 'Pending']
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.taskForm.valid) {
      const updatedTask: Task = {
        ...this.data?.task,
        ...this.taskForm.value
      };
      this.dialogRef.close(updatedTask);
    }
  }
}
