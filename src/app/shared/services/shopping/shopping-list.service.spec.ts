import { TestBed } from '@angular/core/testing';
import { ShoppingListService } from './shopping-list.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { importProvidersFrom } from '@angular/core';

describe('ShoppingListService', () => {
  let service: ShoppingListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        importProvidersFrom([AngularFireModule.initializeApp(environment.firebaseConfig)]),
      ]
    });
    service = TestBed.inject(ShoppingListService);
  });

  it('should be created ShoppingListService', () => {
    expect(service).toBeTruthy();
  });
});
