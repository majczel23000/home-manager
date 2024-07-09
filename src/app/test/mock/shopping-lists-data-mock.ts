import { ShoppingListModel } from "src/app/shared/models/shopping/shopping-list.model";

export const mockShoppingLists: ShoppingListModel[] = [
    {
        id: 'shopping_1',
        name: 'Home',
        products: [
            {
                isAdded: false,
                item: 'Milk',
                quantity: '1',
                category: 'Fridge',
                id: 1,
            },
            {
                isAdded: false,
                item: 'Bread',
                quantity: '2',
                category: 'Bakery',
                id: 2,
            }
        ]
    },
    {
        id: 'shopping_2',
        name: 'Garage',
        products: [
            {
                isAdded: false,
                item: 'Desk',
                quantity: '1',
                category: 'Tools',
                id: 1,
            }
        ]
    }
];