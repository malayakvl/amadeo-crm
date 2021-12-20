import { createSelector } from 'reselect';

// ------------------------------------
// Selectors
// ------------------------------------
const rootSelector = createSelector(
    (state: State.Root) => state.products,
    (products: State.Products): State.Products => products
);

export const productColorSelector = createSelector(
    rootSelector,
    (products: State.Products): Products.Color[] => products.colors
);
export const productSizesSelector = createSelector(
    rootSelector,
    (products: State.Products): Products.Size[] => products.sizes
);
export const uploadedFilesSelector = createSelector(
    rootSelector,
    (products: State.Products): File[] => products.uploadedFiles
);
export const paginatedProductsSelector = createSelector(
    rootSelector,
    (products: State.Products): any => products.items
);
export const productsCountSelector = createSelector(
    rootSelector,
    (products: State.Products): number => products.count
);
export const activeTabSelector = createSelector(
    rootSelector,
    (products: State.Products): string => products.activeTab
);
export const productItemSelector = createSelector(
    rootSelector,
    (products: State.Products): Products.Product => products.product
);
export const isFetchSelector = createSelector(
    rootSelector,
    (products: State.Products): boolean => products.isFetched
);
export const selectedColorsSelector = createSelector(
    rootSelector,
    (products: State.Products): any => products.selectedColors
);
export const selectedSizesSelector = createSelector(
    rootSelector,
    (products: State.Products): any => products.selectedSizes
);
