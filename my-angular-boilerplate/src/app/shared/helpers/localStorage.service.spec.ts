import { TestBed, inject } from '@angular/core/testing';

import { LocalStorageService } from './localStorage.service';

describe('LocalStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });
    localStorage.clear();
  });

  it('should be created LocalStorageService', inject([LocalStorageService], (service: LocalStorageService) => {
    expect(service).toBeTruthy();
  }));

  it('should set and get token string in localstorage', inject([LocalStorageService], (service: LocalStorageService) => {
    service.setToken('123456');
    expect(service.getToken()).toEqual('123456');
  }));

  it('should set and get userId string in localstorage', inject([LocalStorageService], (service: LocalStorageService) => {
    service.setUserId('123456');
    expect(service.getUserId()).toEqual('123456');
  }));

  it('should get null token in localstorage', inject([LocalStorageService], (service: LocalStorageService) => {
    expect(service.getToken()).toEqual('');
  }));

  it('should get null userId in localstorage', inject([LocalStorageService], (service: LocalStorageService) => {
    expect(service.getUserId()).toEqual('');
  }));
});
