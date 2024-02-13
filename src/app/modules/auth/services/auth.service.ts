import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@core/models/User';
import { LocalStorageService } from '@shared/services/localstorage/local-storage.service';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL = environment.urlApi;

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) { }

  signIn(username: string, password: string): Observable<User> {
    const body = {
      username,
      password
    }
    return this.httpClient.post<User>(`${this.URL}/auth`, body)
      .pipe(
        tap((user: User) => {
          const infoUser = {
            username: user.username,
            id: user.id
          }
          this.localStorageService.saveData('user', infoUser);
          this.localStorageService.saveData('token', user.token);
        })
      );
  }
}