import { createSelector } from 'reselect';

// ------------------------------------
// Selectors
// ------------------------------------
const rootSelector = createSelector(
    (state: State.Root) => state.notifications,
    (notifications: State.Notifications): State.Notifications => notifications
);

export const cntNewSelector = createSelector(
    rootSelector,
    (notifications: State.Notifications): any => notifications.cntNew
);
