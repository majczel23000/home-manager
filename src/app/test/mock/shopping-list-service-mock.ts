import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ShoppingListModel } from 'src/app/shared/models/shopping/shopping-list.model';
import { ShoppingListService } from 'src/app/shared/services/shopping/shopping-list.service';
import { mockShoppingLists } from './shopping-lists-data-mock';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { CategoryModel } from 'src/app/shared/models/shopping/category.model';
import { mockCategories } from './categories-mock';

@Injectable()
export class MockShoppingListService extends ShoppingListService {

  public dataBS: BehaviorSubject<ShoppingListModel[]>;
  public dataSingleBS: BehaviorSubject<ShoppingListModel>;
  public mock: ShoppingListModel[] = [];

  constructor() {
    super();
    this.mock = JSON.parse(JSON.stringify(mockShoppingLists));
    this.dataBS = new BehaviorSubject(this.mock);
    this.dataSingleBS = new BehaviorSubject(this.mock[0]);
  }

  override getShoppingLists(): Observable<ShoppingListModel[]> {
    return this.dataBS.asObservable();
  }

  override deleteShoppingList(id: string): Promise<void> {
    this.mock.splice(parseInt(id), 1);
    this.dataBS.next(this.mock);
    return Promise.resolve();
  }

  override createShoppingList(shoppingList: ShoppingListModel): Promise<void | DocumentReference<unknown>> {
    this.mock.push(shoppingList);
    this.dataBS.next(this.mock);
    return Promise.resolve();
  }

  override getShoppingListById(id: string): Observable<ShoppingListModel> {
    return this.dataSingleBS.asObservable();
  }

  override getCategories(): Observable<CategoryModel[]> {
    return of(mockCategories);
  }

  override updateShoppingList(shoppingList: ShoppingListModel): Promise<void> {
    const idx = this.mock.findIndex(el => el.id === shoppingList.id);
    this.mock[idx] = shoppingList;
    this.dataSingleBS.next(this.mock[idx]);
    return Promise.resolve();
  }
}
