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
