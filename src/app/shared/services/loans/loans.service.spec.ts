import { TestBed } from '@angular/core/testing';

import { LoansService } from './loans.service';
import { importProvidersFrom } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';

describe('LoansService', () => {
  let service: LoansService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        importProvidersFrom([AngularFireModule.initializeApp(environment.firebaseConfig)]),
      ]
    });
    service = TestBed.inject(LoansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
