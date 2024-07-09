import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './header.component';
import { NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        RouterTestingModule,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    (router.events as any).next(new NavigationEnd (1, '/', '/'));
    fixture.detectChanges();
  });

  it('should create HeaderComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render two buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toBe(2);
  });

  it('should render back button with invisible styles', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons[1].nativeElement.style.visibility).toBe('hidden');
  });

  it('should render back button with visible styles when location is different than homepage', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    (router.events as any).next(new NavigationEnd (1, '/someOtherLocation', '/someOtherLocation'));
    fixture.detectChanges();
    expect(buttons[1].nativeElement.style.visibility).toBe('visible');
  })

  it('should call back history function after back button click', () => {
    spyOn(window.history, 'back');
    const backButton = fixture.debugElement.queryAll(By.css('button'))[1];
    (router.events as any).next(new NavigationEnd (1, '/someOtherLocation', '/someOtherLocation'));
    fixture.detectChanges();
    expect(backButton.nativeElement.style.visibility).toBe('visible');
    backButton.nativeElement.click();
    expect(window.history.back).toHaveBeenCalled();
  })

  it('should call toogle action on menu button click', () => {
    const menuButton = fixture.debugElement.queryAll(By.css('button'))[0];
    (component.sideNav as any) = { toggle: () => null };
    spyOn(component.sideNav!, 'toggle');
    expect(menuButton).toBeTruthy();
    menuButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.sideNav!.toggle).toHaveBeenCalled();
  })
});
