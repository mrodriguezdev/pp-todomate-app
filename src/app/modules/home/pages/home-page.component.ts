import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewTask } from '@core/models/NewTask';
import { Task } from '@core/models/Task';
import { User } from '@core/models/User';
import { LocalStorageService } from '@shared/services/localstorage/local-storage.service';
import { NotificationService } from '@shared/services/notification/notification.service';
import { TaskService } from '@shared/services/task/task.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  tasks: Array<Task> = [];
  user!: User;
  isLoading: boolean = true;

  formTask: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    creationDate: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
    priority: new FormControl('alta', Validators.required),
  });

  constructor(private taskService: TaskService, private localStorageService: LocalStorageService, private notificationService: NotificationService) {
    this.user = this.localStorageService.getData('user')
  }

  ngOnInit(): void {
    this.fillTable();
  }

  newTask(): void {
    const newTask: NewTask = {
      ...this.formTask.value,
      user_id: this.user.id
    };
    this.notificationService.showLoadNotification('Creating...');
    this.taskService.create(newTask)
      .subscribe({
        next: () => {
          this.isLoading = true;
          this.fillTable();
          this.notificationService.hideAlert();
        },
        error: (err) => {
          const content = err?.error?.content || 'Unexpected error';
          console.error('An error occurred while processing your request. Details: ', content);
          this.notificationService.showErrorNotification('An error occurred while processing your request.');
        }
      });
  }

  fillTable() {
    this.taskService.getTasks(this.user.id).subscribe({
      next: (tasks: Task[]) => {
        this.tasks = tasks;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = true;
        const content = err?.error?.content || 'Unexpected error';
        console.error('An error occurred while processing your request. Details: ', content);
        this.notificationService.showErrorNotification('An error occurred while processing your request.');
      }
    }
    );
  }

  clear(): void {
    this.formTask.reset({
      priority: 'alta'
    });
  }
}
