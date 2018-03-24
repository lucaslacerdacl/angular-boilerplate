import { TestBed, inject } from '@angular/core/testing';

import { NotificationSwalService } from './notification.swal.service';

describe('NotificationSwalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationSwalService]
    });
  });

  it('should be created NotificationSwalService', inject([NotificationSwalService], (service: NotificationSwalService) => {
    expect(service).toBeTruthy();
  }));
});
