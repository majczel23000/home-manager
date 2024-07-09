import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ROUTES } from '../../routes';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DashboardComponent,
        RouterTestingModule.withRoutes(ROUTES)
      ],
    })
    .compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create DashboardComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render shopping lists on first place with text \'Lista zakupów\'', () => {
    const items = fixture.debugElement.queryAll(By.css('mat-card'));
    const itemParagraph = items[0].query(By.css('p'));
    expect(itemParagraph.nativeElement.innerText).toBe('Lista zakupów');
  });

  it('should render shopping lists on first place with text \'Pożyczki / Długi\'', () => {
    const items = fixture.debugElement.queryAll(By.css('mat-card'));
    const itemParagraph = items[1].query(By.css('p'));
    expect(itemParagraph.nativeElement.innerText).toBe('Pożyczki / Długi');
  });

  it('should navigate to shopping lists screen', () => {
    spyOn(router, 'navigateByUrl');
    const item = fixture.debugElement.queryAll(By.css('mat-card'))[0];
    item.triggerEventHandler('click');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/shopping');
  });

  it('should navigate to loans list screen', () => {
    spyOn(router, 'navigateByUrl');
    const item = fixture.debugElement.queryAll(By.css('mat-card'))[1];
    item.triggerEventHandler('click');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/loans');
  });
});
