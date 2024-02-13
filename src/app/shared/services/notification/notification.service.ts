import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  showSuccessNotification(text: string) {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: text,
      showConfirmButton: false,
      timer: 2000,
    });
  }

  showErrorNotification(text: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops..',
      text: text,
      showConfirmButton: true,
      footer: 'Please contact the administrator for assistance.',
      timer: 2500,
    });
  }

  showLoadNotification(title: string) {
    const swalWithLoading = Swal.mixin({
      title: title,
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
    });

    swalWithLoading.fire();
  }

  hideAlert() {
    Swal.close();
  }
}
