import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITask } from '../../interfaces/task.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TasksService {

  httpClient = inject(HttpClient);

  getAll(): Observable<ITask[]> {
    return this.httpClient.get<ITask[]>('/api/tasks');
  }   
}