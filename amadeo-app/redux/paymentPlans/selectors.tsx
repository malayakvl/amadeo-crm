import { createSelector } from 'reselect';

// ------------------------------------
// Selectors
// ------------------------------------
const rootSelector = createSelector(
    (state: State.Root) => state.paymentPlans,
    (paymentPlans: State.PaymentPlans): State.PaymentPlans => paymentPlans
);

export const itemsSelector = createSelector(
    rootSelector,
    (paymentPlans: State.PaymentPlans): any => paymentPlans.items
);
