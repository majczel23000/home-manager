import { Injectable, inject } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { ProductModel } from '../../models/shopping/shopping-list.model';
import { CategoryModel } from '../../models/shopping/category.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  protected firestore = inject(AngularFirestore);

  // Get shopping list details
  getShoppingList(): Observable<ProductModel[]> {
    return this.firestore.collection('shoppinglist').snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => {
          return ({ ...(c.payload.doc.data() as ProductModel), id: c.payload.doc.id })
        });
      })
    );
  }

  // Update product in shopping list
  updateProduct(product: ProductModel): Promise<void> {
    return this.firestore.collection('shoppinglist').doc(product.id).set(product, { merge: true });
  }

  // Update product from shopping list
  deleteProductFromShoppingList(id: string): Promise<void> {
    return this.firestore.collection('shoppinglist').doc(id).delete();
  }

  // Create new product in shopping list
  createNewProductInList(product: ProductModel): Promise<void | DocumentReference<unknown>> {
    return this.firestore.collection('shoppinglist').add(product).then(ref => {
      ref.set({ id: ref.id }, { merge: true });
    });
  }

  // Get all categories (sorted)
  getCategories(): Observable<CategoryModel[]> {
    return this.firestore.collection('categories').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({id: c.payload.doc.id, ...(c.payload.doc.data() as CategoryModel)}))
        .sort((a, b) => a.name.localeCompare(b.name))
      )
    );
  }
}
