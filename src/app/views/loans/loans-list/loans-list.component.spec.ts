import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansListComponent } from './loans-list.component';
import { importProvidersFrom } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('LoansListComponent', () => {
  let component: LoansListComponent;
  let fixture: ComponentFixture<LoansListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoansListComponent,
      ],
      providers: [
        importProvidersFrom([AngularFireModule.initializeApp(environment.firebaseConfig)]),
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoansListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
