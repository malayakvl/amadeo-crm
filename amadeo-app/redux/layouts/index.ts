import { handleActions } from 'redux-actions';
import {
    setPaginationAction,
    toggleSidebarAction,
    closeSidebarAction,
    setErrorToastAction,
    setSuccessToastAction,
    setInfoToastAction,
    deleteToastAction
} from './actions';
// import { AssetCategories, DefaultPreWarningSettingValue, CableVoltages } from 'constants/index';

const initPagination = { limit: 35, offset: 0, sort: 'DESC', column: 'created_at', query: '' };

const initialState: State.Layouts = {
    pagination: {
        notifications: { ...initPagination }
    },
    isSidebarOpen: true,
    toasts: []
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS: any = {
    [setPaginationAction]: (
        state: State.Layouts,
        action: Type.ReduxAction<{
            type: Type.PaginationType;
            modifier: Partial<Layouts.Pagination>;
        }>
    ): State.Layouts => ({
        ...state,
        pagination: {
            ...state.pagination,
            [action.payload.type]: {
                ...state.pagination[action.payload.type],
                ...action.payload.modifier
            }
        }
    }),

    [toggleSidebarAction]: (state: State.Layouts): State.Layouts => ({
        ...state,
        isSidebarOpen: !state.isSidebarOpen
    }),

    [closeSidebarAction]: (state: State.Layouts): State.Layouts => ({
        ...state,
        isSidebarOpen: false
    }),
    [setErrorToastAction]: (
        state: State.Layouts,
        action: Type.ReduxAction<Layouts.ToastMessage>
    ): State.Layouts => ({
        ...state,
        toasts: [...state.toasts, { id: Date.now(), type: 'error', message: action.payload }]
    }),

    [setSuccessToastAction]: (
        state: State.Layouts,
        action: Type.ReduxAction<Layouts.ToastMessage>
    ): State.Layouts => ({
        ...state,
        toasts: [...state.toasts, { id: Date.now(), type: 'success', message: action.payload }]
    }),

    [setInfoToastAction]: (
        state: State.Layouts,
        action: Type.ReduxAction<Layouts.ToastMessage>
    ): State.Layouts => ({
        ...state,
        toasts: [...state.toasts, { id: Date.now(), type: 'info', message: action.payload }]
    }),

    [deleteToastAction]: (
        state: State.Layouts,
        action: Type.ReduxAction<number>
    ): State.Layouts => ({
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload)
    })
};

export {
    setPaginationAction,
    toggleSidebarAction,
    closeSidebarAction,
    setErrorToastAction,
    setSuccessToastAction,
    setInfoToastAction,
    deleteToastAction
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
