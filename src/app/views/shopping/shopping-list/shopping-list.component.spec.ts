import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingListComponent } from './shopping-list.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { CurrentLocationComponent } from '../../current-location/current-location.component';
import { ActivatedRoute, Router } from '@angular/router';
import { mockShoppingLists } from 'src/app/test/mock/shopping-lists-data-mock';
import { ROUTES } from 'src/app/routes';
import { ShoppingListService } from 'src/app/shared/services/shopping/shopping-list.service';
import { MockShoppingListService } from 'src/app/test/mock/shopping-list-service-mock';
import { provideAnimations } from '@angular/platform-browser/animations';
import { mockCategories } from 'src/app/test/mock/categories-mock';

describe('ShoppingListComponent', () => {
  let component: ShoppingListComponent;
  let fixture: ComponentFixture<ShoppingListComponent>;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        RouterTestingModule.withRoutes(ROUTES),
        ShoppingListComponent
      ],
      providers: [
        provideAnimations(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: new Map([
                ['id', mockShoppingLists[0].id]
              ])
            }
          }
        },
        {
          provide: ShoppingListService,
          useClass: MockShoppingListService,
        },
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(ShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ShoppingListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should contain current location component', () => {
    const currentLocation = fixture.debugElement.query(By.directive(CurrentLocationComponent));
    expect(currentLocation).toBeTruthy();
  });

  it('should get details of first shopping list with proper id parameter', () => {
    expect(component.shoppingList.id).toBe(mockShoppingLists[0].id);
  });

  it('should navigate to shopping lists view when empty id parameter', () => {
    spyOn(activatedRoute.snapshot.paramMap, 'get').and.returnValue('');
    fixture = TestBed.createComponent(ShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/shopping');
  });

  it('should render proper amount of mat-list-item tags', () => {
    const items = fixture.debugElement.queryAll(By.css('mat-list-item'));
    expect(items.length).toBe(component.shoppingList.products!.length);
  });

  it('should have proper amount of categories sections', () => {
    const categories: string[] = [];
    component.shoppingList.products!.forEach(el => {
      if (!categories.includes(el.category)) {
        categories.push(el.category);
      }
    });
    const categoriesTitles = fixture.debugElement.queryAll(By.css('.details-category-title'));
    expect(categoriesTitles.length).toBe(categories.length);
  });

  it('should change background to red and change text style after product click and reverse', () => {
    let item = fixture.debugElement.query(By.css('mat-list-item'));
    let details = item.query(By.css('.details-item'));
    expect(item.nativeElement.style.backgroundColor).toBe('');
    expect(details.nativeElement.style.textDecoration).toBe('');
    item.triggerEventHandler('click');
    fixture.detectChanges();
    // needs to query one more time because of rerendering ngFor strructure, so old mat-list-items does not exist
    item = fixture.debugElement.query(By.css('mat-list-item'));
    details = item.query(By.css('.details-item'));
    expect(item.nativeElement.style.backgroundColor).toBe('rgb(255, 167, 161)');
    expect(details.nativeElement.style.textDecoration).toBe('line-through');
    item.triggerEventHandler('click');
    fixture.detectChanges();
    // same here, get new mat-list-item after rerender of ngFor
    item = fixture.debugElement.query(By.css('mat-list-item'));
    details = item.query(By.css('.details-item'));
    expect(item.nativeElement.style.backgroundColor).toBe('');
    expect(details.nativeElement.style.textDecoration).toBe('');
  });

  it('should have correct amount of products after deleting one', () => {
    const items = fixture.debugElement.queryAll(By.css('mat-list-item'));
    const productsBefore = component.shoppingList.products!.length;
    expect(items.length).toBe(productsBefore);
    const button = items[0].query(By.css('.details-button'));
    button.triggerEventHandler('click', {
      preventDefault(): void {},
      stopPropagation(): void {},
    });
    expect(component.shoppingList.products!.length).toBe(productsBefore - 1);
  });

  it('should render form for adding product', () => {
    const form = fixture.debugElement.query(By.css('form.add-shopping-list'));
    expect(form).toBeTruthy();
  });

  it('should render button with disabled state by default for adding product ', () => {
    const form = fixture.debugElement.query(By.css('form.add-shopping-list'));
    const button = form.query(By.css('button'));
    expect(button.nativeElement.disabled).toBeTrue();
  });

  it('should render mat-options after clicking on select with categories', () => {
    const matSelect = fixture.debugElement.query(By.css('mat-select'));
    expect(matSelect).toBeTruthy();
    matSelect.nativeElement.click();
    fixture.detectChanges();
    const matOptions = fixture.debugElement.queryAll(By.css('mat-option'));
    expect(matOptions.length).toBe(mockCategories.length);
  });

  // it('should add new product to shopping list', () => {
  //   const NEW_PRODUCT_NAME = 'New product';
  //   const NEW_PRODUCT_QUANTITY = '2';
  //   const NEW_PRODUCT_CATEGORY = mockCategories[0].name;
  //   component.addedProduct.item = NEW_PRODUCT_NAME;
  //   component.addedProduct.quantity = NEW_PRODUCT_QUANTITY;
  //   component.addedProduct.category = NEW_PRODUCT_CATEGORY;
  //   const button = fixture.debugElement.query(By.css('form')).query(By.css('button'));
  //   button.triggerEventHandler('click');
  //   fixture.detectChanges();
  //   const matListItems = fixture.debugElement.queryAll(By.css('mat-list-item'));
  //   expect(matListItems.length).toBe(component.shoppingList.products!.length)
  // });
});
