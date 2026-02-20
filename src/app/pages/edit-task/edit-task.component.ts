import { Component, effect, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ITask, ITaskCreate } from 'src/app/shared/interfaces/task.interface';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss',
})
export class EditTaskComponent {

  public task = input<ITask>();

  tasksService = inject(TasksService);
  router = inject(Router);

  public form = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    completed: new FormControl(false, { nonNullable: true })
  });

  effectRef = effect(() => {
    const task = this.task() as ITask;
    
    this.form.setValue({
      title: task.title,
      completed: task.completed
    });
  });

  onSubmit() {
    const payload: ITaskCreate = {
      title: this.form.get('title')?.value as string,
      completed: this.form.value.completed as boolean
    }

    const task = this.task() as ITask;

    this.tasksService.put(task.id, payload).subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
