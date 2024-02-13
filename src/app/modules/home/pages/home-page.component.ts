import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewTask } from '@core/models/NewTask';
import { Task } from '@core/models/Task';
import { TaskService } from '@shared/services/task/task.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  tasks: Array<Task> = [];

  formTask: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    creationDate: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
    priority: new FormControl('alta', Validators.required),
  });

  constructor(private taskService: TaskService) { }

  newTask(): void {
    const newTask: NewTask = this.formTask.value;
    console.log(newTask);
    this.taskService.create(newTask)
      .subscribe({
        next: (task: Task) => {
          this.tasks.push(task);
        },
        error: (err) => {
          const content = err?.error?.content || 'Unexpected error';
          console.error('An error occurred while processing your request. Details: ', content);
        }
      });
  }

  clear(): void {
    this.formTask.reset({
      priority: 'alta'
    });
  }
}
