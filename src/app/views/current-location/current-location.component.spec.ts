import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CurrentLocationComponent } from './current-location.component';

describe('CurrectLocationComponent', () => {
  let component: CurrentLocationComponent;
  let fixture: ComponentFixture<CurrentLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CurrentLocationComponent,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create DashboardComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render empty title after init', () => {
    const h2 = fixture.debugElement.query(By.css('h2'));
    expect(h2.nativeElement.innerText).toBe('');
  });

  it('should render proper text after Input property update', () => {
    const LOCATION_NAME = 'Test Name';
    const LOCATION_ID = 'Test ID';
    const h2 = fixture.debugElement.query(By.css('h2'));
    component.location = LOCATION_NAME;
    component.id = LOCATION_ID;
    fixture.detectChanges();
    expect(h2.nativeElement.innerText).toBe(`${LOCATION_NAME} ${LOCATION_ID}`);
  });
});
