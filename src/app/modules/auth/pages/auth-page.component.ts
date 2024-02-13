import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '@shared/services/notification/notification.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService) { }

  signIn() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.notificationService.showLoadNotification('Authenticating...');
      this.authService.signIn(username, password)
        .subscribe({
          next: () => {
            this.router.navigate(['/']);
            this.notificationService.hideAlert();
          }
        });
    }
  }
}
