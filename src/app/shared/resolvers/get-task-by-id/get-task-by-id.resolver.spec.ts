import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideRouter, ResolveFn, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { getTaskByIdResolver } from './get-task-by-id.resolver';
import { MockProvider } from 'ng-mocks';
import { TasksService } from '../../services/tasks/tasks.service';
import { Observable, of } from 'rxjs';
import { ITask } from '../../interfaces/task.interface';
import { Component, input } from '@angular/core';
import { By } from '@angular/platform-browser';

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
            path: 'teste/:id',
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
});
