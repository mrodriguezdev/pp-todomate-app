import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  saveData(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getData(key: string): any {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  removeData(key: string) {
    localStorage.removeItem(key);
  }
}
