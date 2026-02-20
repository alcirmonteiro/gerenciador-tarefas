import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask, ITaskCreate } from '../../interfaces/task.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  httpClient = inject(HttpClient);

  getAll(): Observable<ITask[]> {
    return this.httpClient.get<ITask[]>('/api/tasks');
  }   

  patch(id: string, payload: Partial<ITask>): Observable<ITask> {
    return this.httpClient.patch<ITask>(`/api/tasks/${id}`, payload);
  } 

  delete(id: string): Observable<ITask> {
    return this.httpClient.delete<ITask>(`/api/tasks/${id}`);
  }

  post(payload: ITaskCreate): Observable<ITask> {
    return this.httpClient.post<ITask>('/api/tasks/', payload);
  } 

  put(id: string, payload: ITaskCreate): Observable<ITask> {
    return this.httpClient.put<ITask>(`/api/tasks/${id}`, payload);
  } 

}