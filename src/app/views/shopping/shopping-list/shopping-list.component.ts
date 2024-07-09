import { Component, OnDestroy, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryProductModel } from 'src/app/shared/models/shopping/category-products.model';
import { CategoryModel } from 'src/app/shared/models/shopping/category.model';
import { ProductModel } from 'src/app/shared/models/shopping/shopping-list.model';
import { ShoppingListService } from 'src/app/shared/services/shopping/shopping-list.service';
import { CurrentLocationComponent } from '../../current-location/current-location.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import { ShoppingListAddComponent } from '../shopping-list-add/shopping-list-add.component';

@Component({
  standalone: true,
  imports: [
    CurrentLocationComponent,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    ShoppingListAddComponent,
  ],
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  protected shoppingListService = inject(ShoppingListService);
  protected router = inject(Router);
  protected subscriptions: Subscription[] = [];
  public isLoading = true;
  public shoppingList: ProductModel[] = [];
  public categories: CategoryModel[] = [];
  public elementsAndCategories: CategoryProductModel[] = [];
  protected startClickEventTime: number = 0;
  public editElement: ProductModel = {
    item: '',
    quantity: '',
    category: '',
    isAdded: false
  }

  ngOnInit(): void {
    this.getCategories();
  }

  protected getCategories(): void {
    this.subscriptions.push(
      this.shoppingListService.getCategories().subscribe(
        categories => {
          this.categories = categories;
          this.getShoppingListDetails();
        }
      )
    );
  }

  protected getShoppingListDetails(): void {
    this.subscriptions.push(
      this.shoppingListService.getShoppingList().subscribe(
        shoppingList => {
          this.shoppingList = shoppingList;
          this.createCategoriesWithProducts();
        }
      )
    );
  }

  protected createCategoriesWithProducts(): void {
    this.elementsAndCategories = [];
    this.categories.forEach(category => this.elementsAndCategories.push({
      category: category.name,
      elements: [],
    }));
    this.shoppingList.forEach(product => {
      this.elementsAndCategories.find(category => category.category === product.category)?.elements.push(product);
    });
    this.elementsAndCategories = this.elementsAndCategories.filter(element => element.elements?.length);
    this.isLoading = false;
  }

  public removeItem(event: any, id: string): void {
    event.preventDefault();
    event.stopPropagation();
    this.shoppingListService.deleteProductFromShoppingList(id);
  }

  public saveEditedItem(event: any, sectionIndex: number, elementIndex: number, id: string): void {
    event.preventDefault();
    event.stopPropagation();
    const product = this.shoppingList.find(product => product.id === id)!;
    product.quantity = this.editElement.quantity;
    product.item = this.editElement.item;
    delete product.editMode;
    this.elementsAndCategories[sectionIndex].elements[elementIndex].editMode = false;
    this.shoppingListService.updateProduct(product);
  }

  public selectItem(id: string): void {
    const product = this.shoppingList.find(product => product.id === id)!;
    product.isAdded = !product.isAdded;
    delete product.editMode;
    this.shoppingListService.updateProduct(product);
  }

  public startClickEvent(): void {
    this.startClickEventTime = Date.now();
  }

  public endClickEvent(sectionIndex: number, elementIndex: number, elementId: string): void {
    const end = Date.now();
    const diff = end - this.startClickEventTime + 1;
    const selectedItem = this.elementsAndCategories[sectionIndex].elements[elementIndex];
    if (diff < 500 && !selectedItem.editMode) {
      this.selectItem(elementId);
      return;
    }
    // reset all other edit modes - keep only one active edit mode
    this.elementsAndCategories.forEach((category, categoryIdx) => {
      category.elements.forEach((element, elementIdx) => {
        if (categoryIdx !== sectionIndex || (categoryIdx === sectionIndex && elementIdx !== elementIndex)) {
          element.editMode = false;
        }
      });
    });
    // display proper edit mode
    if (!selectedItem.editMode) {
      selectedItem.editMode = true;
      this.editElement = {
        item: selectedItem.item!,
        quantity: selectedItem.quantity!,
        isAdded: selectedItem.isAdded!,
        category: selectedItem.category!,
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
