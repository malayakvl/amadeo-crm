import { handleActions } from 'redux-actions';
import {
    setPaginationAction,
    toggleSidebarAction,
    closeSidebarAction,
    setErrorToastAction,
    setSuccessToastAction,
    setInfoToastAction,
    deleteToastAction,
    checkIdsAction,
    initIdsAction,
    checkAllIdsAction,
    uncheckAllIdsAction,
    setModalConfirmationMetaAction
} from './actions';

const initPagination = { limit: 25, offset: 0, sort: 'DESC', column: 'created_at', query: '' };

const initialState: State.Layouts = {
    pagination: {
        notifications: { ...initPagination },
        products: {
            ...initPagination,
            filters: { product_name: '', color_id: [], size_id: [], price: [], quantity: [] }
        },
        shipping: {...initPagination}
    },
    isSidebarOpen: true,
    toasts: [],
    checkedIds: [],
    // checkedIds: {
    //     products: [],
    //     notifications: []
    // },
    modalConfirmationMeta: null
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
    [initIdsAction]: (
        state: State.Layouts,
        action: Type.ReduxAction<State.Layouts>
    ): State.Layouts => {
        return <Layouts.Root>(<unknown>{
            ...state,
            checkedIds: action.payload
        });
    },
    [checkIdsAction]: (
        state: State.Layouts,
        action: Type.ReduxAction<State.Layouts>
    ): State.Layouts => {
        return <Layouts.Root>{
            ...state,
            checkedIds: state.checkedIds.map((data) =>
                (data as any).id === action.payload ? { ...data, checked: !data.checked } : data
            )
        };
    },
    [checkAllIdsAction]: (state: State.Layouts): State.Layouts => {
        return <Layouts.Root>{
            ...state,
            checkedIds: state.checkedIds.map((data) =>
                (data as any).id ? { ...data, checked: true } : data
            )
        };
    },
    [uncheckAllIdsAction]: (state: State.Layouts): State.Layouts => {
        return <Layouts.Root>{
            ...state,
            checkedIds: state.checkedIds.map((data) =>
                (data as any).id ? { ...data, checked: false } : data
            )
        };
    },
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
    }),
    [setModalConfirmationMetaAction]: (
        state: State.Layouts,
        action: Type.ReduxAction<Layouts.ModalConfirmationMeta>
    ): State.Layouts => ({
        ...state,
        modalConfirmationMeta: action.payload && {
            ...action.payload
        }
    })
};

export {
    setPaginationAction,
    initIdsAction,
    checkAllIdsAction,
    uncheckAllIdsAction,
    checkIdsAction,
    toggleSidebarAction,
    closeSidebarAction,
    setErrorToastAction,
    setSuccessToastAction,
    setInfoToastAction,
    deleteToastAction,
    setModalConfirmationMetaAction
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
