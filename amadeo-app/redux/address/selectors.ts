import { createSelector } from 'reselect';

// ------------------------------------
// Selectors
// ------------------------------------

export const addressSelector = createSelector(
    (state: State.Root) => state.address,
    (address: Address.Root): Address.Root => address
);
