import { createAction } from 'redux-actions';

// ------------------------------------
// Actions
// ------------------------------------
export const setPaginationAction: any = createAction('layouts/SET_PAGINATION');

export const toggleSidebarAction: any = createAction('layouts/TOGGLE_SIDEBAR');

export const closeSidebarAction: any = createAction('layouts/CLOSE_SIDEBAR');

export const setErrorToastAction: any = createAction('layouts/SET_ERROR_TOAST');

export const setSuccessToastAction: any = createAction('layouts/SET_SUCCESS_TOAST');

export const setInfoToastAction: any = createAction('layouts/SET_INFO_TOAST');

export const deleteToastAction: any = createAction('layouts/DELETE_TOAST');
