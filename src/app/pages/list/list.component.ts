import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITask } from 'src/app/shared/interfaces/task.interface';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {

  tasks = signal<ITask[]>([]);

  completedTasks = computed(() => this.tasks().filter(task => task.completed));
  pandingTasks = computed(() => this.tasks().filter(task => !task.completed));



}
