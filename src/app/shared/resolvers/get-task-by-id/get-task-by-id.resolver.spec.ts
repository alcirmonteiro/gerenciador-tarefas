import { TestBed } from '@angular/core/testing';
import { provideRouter, ResolveFn, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { getTaskByIdResolver } from './get-task-by-id.resolver';
import { MockProvider } from 'ng-mocks';
import { TasksService } from '../../services/tasks/tasks.service';
import { Observable, of, throwError } from 'rxjs';
import { ITask } from '../../interfaces/task.interface';
import { Component, input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-test',
  template: ''
})
class FakeComponent {
  task = input();
}


describe('getTaskByIdResolver', () => {
  const executeResolver: ResolveFn<Observable<ITask>> = (...resolverParameters) => 
  TestBed.runInInjectionContext(() => 
    getTaskByIdResolver(...resolverParameters)
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(TasksService),
        provideRouter([
          {
            path: 'test/:id',
            resolve: { task: getTaskByIdResolver},
            component: FakeComponent,
          }
        ], withComponentInputBinding())
      ]
    });
  });

  it('deve retornar uma tarefa', async() => {
    const taskService = TestBed.inject(TasksService);

    const fakeTask = { id: '1', title: 'Task 1', completed: false };

    (taskService.getById as jest.Mock).mockReturnValue(of(fakeTask));

    const harness = await RouterTestingHarness.create(`test/${fakeTask.id}`);

    const fakeComponentDebugEl = harness.fixture.debugElement.query(By.directive(FakeComponent));

    expect(taskService.getById).toHaveBeenCalledWith(fakeTask.id);
       
    expect(fakeComponentDebugEl.componentInstance.task()).toBe(fakeTask);
  });

  it('deve retornar um erro quando a tarefa não for encontrada', async() => {
    const taskService = TestBed.inject(TasksService); 

    const fakeTask: ITask = { id: '1', title: 'Task 1', completed: false };

    const fakeHttpErrorResponse = new HttpErrorResponse({
      status: 404,
      statusText: 'Not Found',
    });

    (taskService.getById as jest.Mock).mockReturnValue(
      throwError(() => fakeHttpErrorResponse)
    );

    try {
      await RouterTestingHarness.create(`test/${fakeTask.id}`);
    } catch (error) {
      expect(error).toEqual(fakeHttpErrorResponse);
    } 
  });  
});
