import { Component, input, output } from "@angular/core";
import { ListItemComponent } from "src/app/pages/list/list-item/list-item.component";
import { ITask } from "src/app/shared/interfaces/task.interface";

@Component({
  selector: 'app-list-item',
  standalone: true,
  template: '',
})
export class FakeListItemComponent implements ListItemComponent {
  task = input.required<ITask>();
  complete = output<ITask>();
  notComplete = output<ITask>();
  remove = output<ITask>();

  onComplete(): void {
  }

  onMarkAsPending(): void {
  }

  onRemove(): void {
  }

}