import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITask } from 'src/app/shared/interfaces/task.interface';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { NoItemsComponent } from './no-items/no-items.component';
import { ListItemComponent } from './list-item/list-item.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, NoItemsComponent, ListItemComponent, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  taskService = inject(TasksService); 
  
  tasks = signal<ITask[]>([]);
  completedTasks = computed(() => this.tasks().filter(task => task.completed));
  pandingTasks = computed(() => this.tasks().filter(task => !task.completed));

  ngOnInit(): void {
    this.taskService.getAll().subscribe(tasks => this.tasks.set(tasks));
  }

  onComplete(task: ITask): void {
    this.taskService.patch(task.id, {completed: true}).subscribe(task => {
      this.updateTask(task);
    });
  }  

  onNotComplete(task: ITask) {
    this.taskService.patch(task.id, {completed: false}).subscribe(task => {
      this.updateTask(task);
    });
  }

  onRemove(task: ITask) {
    this.taskService.delete(task.id).subscribe(task => {
      this.removeTask(task);
    });
  }  

  private updateTask(task: ITask): void {
    this.tasks.update(tasks => tasks.map(t => t.id === task.id ? task : t)); 
  }

  private removeTask(task: ITask): void {
    this.tasks.update(tasks => tasks.filter(t => t.id !== task.id)); 
  }

}
