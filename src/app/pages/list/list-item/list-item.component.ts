import { Component, input, output } from '@angular/core';
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

  complete = output<ITask>();
  notComplete = output<ITask>();

  onComplete() {
    this.complete.emit(this.task());
  }

  onMarkAsPending() {
    this.notComplete.emit(this.task());
  }


}
