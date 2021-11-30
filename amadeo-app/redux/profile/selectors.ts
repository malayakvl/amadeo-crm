import { createSelector } from 'reselect';

// ------------------------------------
// Selectors
// ------------------------------------
const rootSelector = createSelector(
    (state: State.Root) => state.profile,
    (profile: State.Profile): State.Profile => profile
);

export const profileSelector = createSelector(rootSelector, (profile: State.Profile): Profile.Profile => profile.profile);
export const crudStatusSelector = createSelector(rootSelector, (profile: State.Profile): any => profile.crudStatus);
export const validEmailSelector = createSelector(rootSelector, (profile: State.Profile): any => profile.validEmail);
