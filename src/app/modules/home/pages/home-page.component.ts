import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  formTask: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    creationDate: new FormControl('', Validators.required),
    dateDue: new FormControl('', Validators.required),
    priority: new FormControl('alta', Validators.required),
  });

  tareas: any = []

  constructor() { }

  newTask(): void {
    console.log(this.formTask.value)
  }

  clear(): void {
    this.formTask.reset({
      priority: 'alta'
    });
  }
}
