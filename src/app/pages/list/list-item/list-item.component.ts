import { Component, input } from '@angular/core';
import { ITask } from 'src/app/shared/interfaces/task.interface';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss'
})
export class ListItemComponent {
  task = input.required<ITask>();

}
