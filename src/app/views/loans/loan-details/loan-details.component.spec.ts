import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanDetailsComponent } from './loan-details.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { importProvidersFrom } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoanDetailsComponent', () => {
  let component: LoanDetailsComponent;
  let fixture: ComponentFixture<LoanDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoanDetailsComponent,
        RouterTestingModule,
      ],
      providers: [
        importProvidersFrom([AngularFireModule.initializeApp(environment.firebaseConfig)]),
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
