import { createSelector } from 'reselect';

// ------------------------------------
// Selectors
// ------------------------------------

export const addressSelector = createSelector(
    (state: State.Root) => state.address,
    (address: Addresses.Address): Addresses.Address => address
);
