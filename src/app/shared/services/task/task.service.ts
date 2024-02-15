import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewTask } from '@core/models/NewTask';
import { Task } from '@core/models/Task';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly url = environment.urlApi;

  constructor(private httpClient: HttpClient) { }

  create(newTask: NewTask): Observable<Task> {
    return this.httpClient.post<Task>(`${this.url}/task`, newTask);
  }

  getTasks(user_id: number): Observable<Task[]> {
    return this.httpClient.get<any>(`${this.url}/task/user/${user_id}`)
      .pipe(
        map((response: any) => response.items as Task[])
      );
  }
}
