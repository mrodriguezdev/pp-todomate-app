import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LocalStorageService } from '@shared/services/localstorage/local-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private localStorageService: LocalStorageService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkStorageSession();
  }

  checkStorageSession(): boolean {
    try {
      const token: string = this.localStorageService.getData('token');

      if (!token) {
        this.router.navigate(['/', 'auth']);
        return false;
      }

      return true;
    } catch (err) {
      console.error('An error occurred while verifying user session', err);
      return false;
    }
  }
}
