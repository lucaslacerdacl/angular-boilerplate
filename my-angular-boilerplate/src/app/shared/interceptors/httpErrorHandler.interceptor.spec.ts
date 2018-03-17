import { HttpRequest, HttpHandler, HttpClient } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { HttpErrorHandlerService } from './httpErrorHandler.interceptor';

describe('HttpErrorHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpErrorHandlerService]
    });
  });

  it('should be created HttpErrorHandlerService', inject([HttpErrorHandlerService], (service: HttpErrorHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
