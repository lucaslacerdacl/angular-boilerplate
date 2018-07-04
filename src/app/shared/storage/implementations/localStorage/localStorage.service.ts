import { ILocalStorage } from './../../interfaces/ILocalStorage';
import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService implements ILocalStorage {

  private encrypt(valueToBeEncrypted: string): string {
    return btoa(valueToBeEncrypted);
  }

  private decrypt(valueToBeDecrypted: string): string {
    return atob(valueToBeDecrypted);
  }

  setValueByKey(key: string, value: string) {
    localStorage.setItem(this.encrypt(key), this.encrypt(value));
  }
  getValueByKey(key: string) {
    return localStorage.getItem(this.encrypt(key)) ? this.decrypt(localStorage.getItem(this.encrypt(key))) : '';
  }
}

