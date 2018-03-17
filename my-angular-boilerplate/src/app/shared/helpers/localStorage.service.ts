import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  private token = btoa('token');
  private userId = btoa('userId');

  getToken(): string {
    return localStorage.getItem(this.token) ? atob(localStorage.getItem(this.token)) : '';
  }
  setToken(token: string): void {
    localStorage.setItem(this.token, btoa(token));
  }
  getUserId(): string {
    return localStorage.getItem(this.userId) ? atob(localStorage.getItem(this.userId)) : '';
  }
  setUserId(userId: string): void {
    localStorage.setItem(this.userId, btoa(userId));
  }

}

