export interface CategoryProductModel {
    category?: string;
    elements: {
        isAdded?: boolean;
        item?: string;
        quantity?: string;
        category?: string;
        id?: string;
        editMode?: boolean;
    }[];
}
