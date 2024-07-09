import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListAddComponent } from './shopping-list-add.component';

describe('ShoppingListAddComponent', () => {
  let component: ShoppingListAddComponent;
  let fixture: ComponentFixture<ShoppingListAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingListAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShoppingListAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
