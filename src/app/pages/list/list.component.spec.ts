import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { By } from '@angular/platform-browser';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve listar as tarefas', () => {
    const todoSection = fixture.debugElement.query(By.css('[data-testid="todo-list"]'));
    expect(todoSection).toBeTruthy();

    const todoItens = todoSection.queryAll(By.css('[data-testid="todo-list-item"]'));
    expect(todoItens.length).toBe(3);

    const completedSection = fixture.debugElement.query(By.css('[data-testid="completed-list"]'));
    expect(completedSection).toBeTruthy();

    const completedItens = completedSection.queryAll(By.css('[data-testid="completed-list-item"]'));
    expect(completedItens.length).toBe(3);

  });
});
