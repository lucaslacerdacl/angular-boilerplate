import { TestBed, inject } from '@angular/core/testing';

import { RestService } from './rest.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('RestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [RestService, HttpClient],
    });
  });

  it('should created RESTService', inject([RestService], (service: RestService<any>) => {
    expect(service).toBeTruthy();
  }));

});