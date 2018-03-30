import { TestBed, inject } from '@angular/core/testing';

import { LocalStorageService } from './localStorage.service';

describe('LocalStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });

  });

  it('should be created LocalStorageService', inject([LocalStorageService], (service: LocalStorageService) => {
    expect(service).toBeTruthy();
  }));

  it('should be set key and value and get value by key', inject([LocalStorageService], (service: LocalStorageService) => {
    service.setValueByKey('token', '123456');
    expect(service.getValueByKey('token')).toEqual('123456');
  }));

  it('should get null value in localstorage', inject([LocalStorageService], (service: LocalStorageService) => {
    expect(service.getValueByKey('key')).toEqual('');
  }));
});
