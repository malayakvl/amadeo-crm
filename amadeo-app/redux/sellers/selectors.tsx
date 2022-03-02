import { createSelector } from 'reselect';

// ------------------------------------
// Selectors
// ------------------------------------
const rootSelector = createSelector(
    (state: State.Root) => state.sellers,
    (sellers: State.Sellers): State.Sellers => sellers
);

export const paginatedItemsSelector = createSelector(
    rootSelector,
    (sellers: State.Sellers): any => sellers.items
);
export const itemsCountSelector = createSelector(
    rootSelector,
    (sellers: State.Sellers): number => sellers.count
);
export const showPopupSelector = createSelector(
    rootSelector,
    (sellers: State.Sellers): boolean => sellers.showPopup
);
export const filterDataSelector = createSelector(
    rootSelector,
    (sellers: State.Sellers): any => sellers.fileterData
);
export const showDatePopupSelector = createSelector(
    rootSelector,
    (sellers: State.Sellers): boolean => sellers.showDateSelector
);
export const showLoginFormSelector = createSelector(
    rootSelector,
    (sellers: State.Sellers): boolean => sellers.showLoginForm
);
export const selectedSellerSelector = createSelector(
    rootSelector,
    (sellers: State.Sellers): string => sellers.selectedSeller
);
