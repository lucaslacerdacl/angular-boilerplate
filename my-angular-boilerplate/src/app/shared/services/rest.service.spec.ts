import { LocalStorageService } from './../storage/implementations/localStorage/localStorage.service';
import { TestBed, inject } from '@angular/core/testing';

import { RestService } from './rest.service';
import { HttpClient } from '@angular/common/http';

describe('RestService', () => {
  let httpClient: HttpClient;
  let localStorage: LocalStorageService;
  let service: RestService;
  beforeEach(() => {
    httpClient = new HttpClient(null);
    localStorage = new LocalStorageService();
    service = new RestService(httpClient, localStorage);
  });

  it('should created RESTService', () => {
    expect(service).toBeTruthy();
  });
});

