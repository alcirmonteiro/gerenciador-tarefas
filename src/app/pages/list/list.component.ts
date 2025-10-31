import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITask } from 'src/app/shared/interfaces/task.interface';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  
  constructor(
    private readonly taskService: TasksService
  ){};

  ngOnInit(): void {
    this.taskService.getAll().subscribe(tasks => this.tasks.set(tasks));
  }

  tasks = signal<ITask[]>([]);

  completedTasks = computed(() => this.tasks().filter(task => task.completed));
  pandingTasks = computed(() => this.tasks().filter(task => !task.completed));




}
