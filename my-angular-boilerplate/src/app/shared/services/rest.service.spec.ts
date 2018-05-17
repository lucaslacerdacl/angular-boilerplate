import { LocalStorageService } from './../storage/implementations/localStorage/localStorage.service';
import { TestBed, inject } from '@angular/core/testing';

import { RestService } from './rest.service';
import { HttpClientModule } from '@angular/common/http';

describe('RestService', () => {
  let service: RestService<any>;
  beforeEach(() => {
    const providers = TestBed.configureTestingModule({
      providers: [
        HttpClientModule,
        { provide: 'ILocalStorage', useClass: LocalStorageService }
      ],
    });
    service = new RestService<any>(providers.get(HttpClientModule), providers.get('ILocalStorage'));
  });

  it('should created RESTService', () => {
    expect(service).toBeTruthy();
  });

});
