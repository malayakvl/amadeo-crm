import { createSelector } from 'reselect';

// ------------------------------------
// Selectors
// ------------------------------------
const rootSelector = createSelector(
    (state: State.Root) => state.orders,
    (orders: State.Orders): State.Orders => orders
);

export const paginatedItemsSelector = createSelector(
    rootSelector,
    (orders: State.Orders): any => orders.items
);
export const itemsCountSelector = createSelector(
    rootSelector,
    (orders: State.Orders): number => orders.count
);
export const itemSelector = createSelector(
    rootSelector,
    (orders: State.Orders): any => orders.item
);
export const showPopupSelector = createSelector(
    rootSelector,
    (orders: State.Orders): boolean => orders.showPopup
);
export const filterDataSelector = createSelector(
    rootSelector,
    (orders: State.Orders): any => orders.fileterData
);
export const showDatePopupSelector = createSelector(
    rootSelector,
    (orders: State.Orders): boolean => orders.showDateSelector
);
