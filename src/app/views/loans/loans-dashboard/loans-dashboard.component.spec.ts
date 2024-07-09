import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansDashboardComponent } from './loans-dashboard.component';
import { importProvidersFrom } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('LoansDashboardComponent', () => {
  let component: LoansDashboardComponent;
  let fixture: ComponentFixture<LoansDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoansDashboardComponent,
      ],
      providers: [
        importProvidersFrom([AngularFireModule.initializeApp(environment.firebaseConfig)]),
        provideAnimations(),
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoansDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
