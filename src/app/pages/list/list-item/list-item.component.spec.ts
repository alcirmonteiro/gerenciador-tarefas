import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemComponent } from './list-item.component';
import { ITask } from 'src/app/shared/interfaces/task.interface';
import { TestHelper } from '@testing/helpers/test-helper';
import { Component } from '@angular/core';

async function setup(fakeTask: ITask) {
  @Component({
    standalone: true,
    imports: [ListItemComponent],
    template: `<app-list-item 
      [task]="task" 
      (complete)="onCompleteTask($event)" 
      (notComplete)="onNotComplete($event)"
      (remove)="onRemove($event)"
    ></app-list-item>`
  })
  class HostComponent {
    task = fakeTask;

    onCompleteTask(){}

    onNotComplete(){}

    onRemove(task: ITask){}
  }    

  await TestBed.configureTestingModule({
    imports: [HostComponent]
  })
  .compileComponents();

  const fixture = TestBed.createComponent(HostComponent);
  const testHelper = new TestHelper(fixture);       

  return { fixture, testHelper };
}

describe('ListItemComponent', () => {
  it('deve renderizar o título da tarefa', async() => {
    
    const fakeTask: ITask = {
      id: '1',
      title: 'Item 1',
      completed: false 
     };

     const { fixture, testHelper } = await setup(fakeTask);

    fixture.detectChanges();

    const text = testHelper.getTextContentByTestId('list-item-task-title').trim();
    expect(text).toBe('Item 1');
  });

  describe('quando a tarefa não estiver concluída', () => {

    it('deve renderizar o botão de concluir tarefa', async() => {
      const fakeTask: ITask = {
        id: '1',
        title: 'Item 1',
        completed: false 
      };

      const { fixture, testHelper } = await setup(fakeTask);
      
      fixture.detectChanges();
                                                            
      const completeBtnDebugEl = testHelper.queryByTestId('list-item-complete-action');
      
      expect(completeBtnDebugEl).toBeTruthy();

     const notCompleteBtnDebugEl = testHelper.queryByTestId('list-item-mark-as-pending-action');
      
      expect(notCompleteBtnDebugEl).toBeNull();
    }); 

    it('deve emitir um evento ao concluir a tarefa', async() => {
      const fakeTask: ITask = {
        id: '1',
        title: 'Item 1',
        completed: false 
      };

      const { fixture, testHelper } = await setup(fakeTask);
      
      const onCompleteTaskSpy = jest.spyOn(fixture.componentInstance, 'onCompleteTask');
      
      fixture.detectChanges();
                                                            
      testHelper.click('list-item-complete-action');

      expect(onCompleteTaskSpy).toHaveBeenCalled();

    });  

    it('deve emitir um evento de remover tarefa', async() => {
      const fakeTask: ITask = {
        id: '1',
        title: 'Item 1',
        completed: false 
      };

      const { fixture, testHelper } = await setup(fakeTask);
      
      const onRemoveTaskSpy = jest.spyOn(fixture.componentInstance, 'onRemove');
      
      fixture.detectChanges();
                                                  
      testHelper.click('list-item-remove-action');

      expect(onRemoveTaskSpy).toHaveBeenCalledWith(fakeTask);

    });  

  });

 
  describe('quando a tarefa estiver concluída', () => {
    it('deve renderizar o botão de marcar tarefa como pendente', async() => {
      const fakeTask: ITask = {
        id: '1',
        title: 'Item 1',
        completed: true 
      };

      const { fixture, testHelper } = await setup(fakeTask);
      
      fixture.detectChanges();
                                                            
      const completeBtnDebugEl = testHelper.queryByTestId('list-item-complete-action');
      
      expect(completeBtnDebugEl).toBeNull();

      const notCompleteBtnDebugEl = testHelper.queryByTestId('list-item-mark-as-pending-action');
      
      expect(notCompleteBtnDebugEl).toBeTruthy();
    }); 

    it('deve emitir um evento que marque a tarefa como pendente', async() => {
      const fakeTask: ITask = {
        id: '1',
        title: 'Item 1',
        completed: true 
      };

      const { fixture, testHelper } = await setup(fakeTask);
      
      const onNotCompleteTaskSpy = jest.spyOn(fixture.componentInstance, 'onNotComplete');
      
      fixture.detectChanges();
                                                            
      testHelper.click('list-item-mark-as-pending-action');

      expect(onNotCompleteTaskSpy).toHaveBeenCalled();

    }); 

    it('deve emitir um evento de remover tarefa', async() => {
      const fakeTask: ITask = {
        id: '1',
        title: 'Item 1',
        completed: true 
      };

      const { fixture, testHelper } = await setup(fakeTask);
      
      const onRemoveTaskSpy = jest.spyOn(fixture.componentInstance, 'onRemove');
      
      fixture.detectChanges();
                                  
      testHelper.click('list-item-remove-action');

      expect(onRemoveTaskSpy).toHaveBeenCalledWith(fakeTask);

    });  
  });  

  


});
