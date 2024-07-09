import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansAddComponent } from './loans-add.component';
import { importProvidersFrom } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('LoansAddComponent', () => {
  let component: LoansAddComponent;
  let fixture: ComponentFixture<LoansAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoansAddComponent,
      ],
      providers: [
        importProvidersFrom([AngularFireModule.initializeApp(environment.firebaseConfig)]),
        provideAnimations(),
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoansAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
