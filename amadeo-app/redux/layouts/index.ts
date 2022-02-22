import { Action, handleActions } from 'redux-actions';
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
    setModalConfirmationMetaAction,
    setSwitchHeaderAction,
    showLoaderAction,
    setActivePageAction,
    setSwitchToggleAction
} from './actions';

const initPagination = { limit: 25, offset: 0, sort: 'DESC', column: 'created_at', query: '' };

const initialState: State.Layouts = {
    pagination: {
        notifications: { ...initPagination },
        products: {
            ...initPagination,
            filters: { product_name: '', color_id: [], size_id: [], price: [], quantity: [] }
        },
        chatbot: { ...initPagination },
        shipping: { ...initPagination },
        buyers: {
            ...initPagination,
            sort: 'ASC',
            column: 'first_name',
            filters: {
                name: '',
                country_id: [],
                total_amount: []
            }
        },
        livesessions: {
            ...initPagination,
            filters: { status: [], duration: [], cart_duration: [], event_date: '' }
        },
        paymentstransactions: {
            ...initPagination,
            filters: {
                order_number: '',
                shipping_id: [],
                country_id: [],
                payment_id: [],
                status: ['payed'],
                total_amount: [],
                created_at: []
            }
        },
        // paymentstransactiondetails: { ...initPagination },
        orders: {
            ...initPagination,
            filters: {
                order_number: '',
                shipping_id: [],
                country_id: [],
                payment_id: [],
                status: [],
                total_amount: [],
                created_at: []
            }
        },
        waiting: {
            ...initPagination,
            filters: {
                order_number: '',
                shipping_id: [],
                country_id: [],
                payment_id: [],
                status: [],
                total_amount: [],
                created_at: []
            }
        }
    },
    isSidebarOpen: true,
    isDataLoading: false,
    toasts: [],
    checkedIds: [],
    switchHeader: false,
    switchToggled: false,
    modalConfirmationMeta: null,
    activeTab: {
        inventory: { tab: 'products' }
    }
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
    [setActivePageAction]: (
        state: State.Layouts,
        action: Type.ReduxAction<{
            type: string;
            modifier: string;
        }>
    ): State.Layouts => ({
        ...state,
        activeTab: {
            ...state.activeTab,
            [action.payload.type]: {
                tab: action.payload.modifier
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
    [showLoaderAction]: {
        next: (state: State.Layouts, action: Action<boolean>): State.Layouts => ({
            ...state,
            isDataLoading: action.payload
        })
    },
    [setSwitchHeaderAction]: {
        next: (state: State.Layouts, action: Action<boolean>): State.Layouts => ({
            ...state,
            switchHeader: action.payload
        })
    },
    [setSwitchToggleAction]: {
        next: (state: State.Layouts, action: Action<boolean>): State.Layouts => ({
            ...state,
            switchToggled: action.payload
        })
    },
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
    setModalConfirmationMetaAction,
    setSwitchToggleAction
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
