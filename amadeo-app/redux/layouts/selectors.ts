import { createSelector } from 'reselect';

// ------------------------------------
// Selectors
// ------------------------------------
const rootSelector = createSelector(
    (state: State.Root) => state.layouts,
    (layouts: State.Layouts): State.Layouts => layouts
);

export const paginationSelectorFactory = (type: string) =>
    createSelector(
        rootSelector,
        (layouts: State.Layouts): Layouts.Pagination => (layouts.pagination as any)[type]
    );

export const isSidebarOpenSelector = createSelector(
    rootSelector,
    (layouts: State.Layouts): boolean => layouts.isSidebarOpen
);

export const toastsSelector = createSelector(
    rootSelector,
    (layouts: State.Layouts): Layouts.Toast[] => layouts.toasts
);
