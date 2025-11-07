import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemComponent } from './list-item.component';
import { ITask } from 'src/app/shared/interfaces/task.interface';
import { TestHelper } from '@testing/helpers/test-helper';

describe('ListItemComponent', () => {
  let fixture: ComponentFixture<ListItemComponent>;
  let testHelper: TestHelper<ListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListItemComponent);
    testHelper = new TestHelper<ListItemComponent>(fixture);
  });
  
  it('deve renderizar o título da tarefa', () => {
    const fakeTask: ITask = {
      title: 'Item 1',
      completed: false 
     };

    fixture.componentRef.setInput('task', fakeTask);
    fixture.detectChanges();

    const text = testHelper.getTextContentByTestId('list-item-task-title').trim();
    expect(text).toBe('Item 1');
  });
});
