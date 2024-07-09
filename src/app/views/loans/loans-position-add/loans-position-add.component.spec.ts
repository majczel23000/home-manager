import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansPositionAddComponent } from './loans-position-add.component';
import { importProvidersFrom } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('LoansPositionAddComponent', () => {
  let component: LoansPositionAddComponent;
  let fixture: ComponentFixture<LoansPositionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoansPositionAddComponent,
      ],
      providers: [
        importProvidersFrom([AngularFireModule.initializeApp(environment.firebaseConfig)]),
        provideAnimations(),
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoansPositionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
