import { ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ITask } from '../../interfaces/task.interface';
import { TasksService } from '../../services/tasks/tasks.service';
import { inject } from '@angular/core';

export const getTaskByIdResolver: ResolveFn<Observable<ITask>> = (route, state) => {
  const tasksService = inject(TasksService);

  const id = route.params['id'];

  const observable = tasksService.getById(id);

  return observable;
};
