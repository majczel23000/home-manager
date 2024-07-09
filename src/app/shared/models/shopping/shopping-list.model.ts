export interface ShoppingListModel {
  id?: string;
  name?: string;
  products?: ProductModel[];
}

export interface ProductModel {
  isAdded: boolean;
  item: string;
  quantity: string;
  category: string;
  id?: string;
  editMode?: boolean;
}
