import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ITask } from "src/app/shared/interfaces/task.interface";
import { TasksService } from "src/app/shared/services/tasks/tasks.service";

export class FakeTasksService implements TasksService {
  httpClient!: HttpClient;
  getAll = jest.fn();
  patch = jest.fn();
  delete = jest.fn();
}