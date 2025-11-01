import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TasksService } from './tasks.service';
import { ITask } from '../../interfaces/task.interface';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('TasksService', () => {
  let service: TasksService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(TasksService);

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('getAll() deve retornar uma lista de tarefas', fakeAsync(() => {
    let result: ITask[] | null = null;

    service.getAll().subscribe(tasks => {
      result = tasks
    });

    const request = httpTestingController.expectOne('/tasks'); 
    const fakeTaskes: ITask[] = [
      {title: 'Item 1', completed: false},
      {title: 'Item 2', completed: false},
      {title: 'Item 3', completed: false},
      {title: 'Item 4', completed: true},
      {title: 'Item 5', completed: true},
      {title: 'Item 6', completed: true},
    ];
    
    request.flush(fakeTaskes);

    tick();
    expect(result).toEqual(fakeTaskes);
  }));
});
