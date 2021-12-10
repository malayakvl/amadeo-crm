import { createSelector } from 'reselect';

// ------------------------------------
// Selectors
// ------------------------------------
const rootSelector = createSelector(
    (state: State.Root) => state.addresses,
    (addresses: State.Addresses): State.Addresses => addresses
);

export const addressesSelector = createSelector(
    rootSelector,
    (addresses: State.Addresses): Addresses.Address[] => addresses.addresses
);
export const addressSelector = createSelector(
    rootSelector,
    (addresses: State.Addresses): Addresses.Address => addresses.address
);
