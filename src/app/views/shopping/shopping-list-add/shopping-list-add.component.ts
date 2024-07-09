import { Component, inject, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { ProductModel } from '../../../shared/models/shopping/shopping-list.model';
import { CategoryModel } from '../../../shared/models/shopping/category.model';
import { ShoppingListService } from '../../../shared/services/shopping/shopping-list.service';

@Component({
  selector: 'app-shopping-list-add',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule
  ],
  templateUrl: './shopping-list-add.component.html',
  styleUrl: './shopping-list-add.component.scss'
})
export class ShoppingListAddComponent {
  @Input() categories: CategoryModel[] = [];

  protected shoppingListService = inject(ShoppingListService);

  public addedProduct: ProductModel = {
    item: '',
    quantity: '',
    category: '',
    isAdded: false
  }

  public addNewProduct(): void {
    if (this.isAddButtonDisabled()) {
      return;
    }
    this.shoppingListService.createNewProductInList(this.addedProduct).then(() => {
      this.addedProduct = { item: '', quantity: '', category: '', isAdded: false }
    });
  }

  public isAddButtonDisabled(): boolean {
    return !this.addedProduct.item.length || !this.addedProduct.quantity.length || !this.addedProduct.category.length;
  }
}
