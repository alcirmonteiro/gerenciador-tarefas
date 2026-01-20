import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemComponent } from './list-item.component';
import { ITask } from 'src/app/shared/interfaces/task.interface';
import { TestHelper } from '@testing/helpers/test-helper';
import { Component } from '@angular/core';

describe('ListItemComponent', () => {
  // let fixture: ComponentFixture<HostComponent>;
  // let testHelper: TestHelper<ListItemComponent>;

  // beforeEach(async () => {

  // });
  
  // it.skip('deve renderizar o título da tarefa', () => {
    
  //   const fakeTask: ITask = {
  //     title: 'Item 1',
  //     completed: false 
  //    };

  //   fixture.componentRef.setInput('task', fakeTask);
  //   fixture.detectChanges();

  //   const text = testHelper.getTextContentByTestId('list-item-task-title').trim();
  //   expect(text).toBe('Item 1');
  // });

  it('deve emitir um evento ao completar a tarefa', async() => {
    const fakeTask: ITask = {
      title: 'Item 1',
      completed: false 
     };

    @Component({
      standalone: true,
      imports: [ListItemComponent],
      template: `<app-list-item 
        [task]="task" 
        (complete)="onCompleteTask($event)" 
      ></app-list-item>`
    })
    class HostComponent {
      task = fakeTask;

      onCompleteTask(){}
    }    

    await TestBed.configureTestingModule({
      imports: [HostComponent]
    })
    .compileComponents();

    const fixture = TestBed.createComponent(HostComponent);
    const testHelper = new TestHelper(fixture);   
    
    const onCompleteTaskSpy = jest.spyOn(fixture.componentInstance, 'onCompleteTask');
    
    fixture.detectChanges();

    const completeBtnDebugEl = testHelper.queryByTestId('list-item-completed-action');
    completeBtnDebugEl.triggerEventHandler('click', null);

    expect(onCompleteTaskSpy).toHaveBeenCalled();

  });  
});
