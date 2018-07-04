import { TestBed, inject } from '@angular/core/testing';

import { LocalStorageService } from './localStorage.service';

describe('LocalStorageService', () => {

  const service = new LocalStorageService();

  it('should be created LocalStorageService', () => {
    expect(service).toBeTruthy();
  });

  it('should be set key and value and get value by key', () => {
    service.setValueByKey('token', '123456');
    expect(service.getValueByKey('token')).toEqual('123456');
  });

  it('should get null value in localstorage', () => {
    expect(service.getValueByKey('key')).toEqual('');
  });
});
