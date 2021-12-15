import { handleActions } from 'redux-actions';
import {
    fetchColorSizesAction,
    addUploadedFile,
    removeUploadedFile,
    fetchProductsAction,
    bulkDeleteAction
} from './actions';

const initialState: State.Products = {
    colors: [],
    sizes: [],
    products: [],
    product: {} as Products.Product,
    loading: false,
    isFetched: false,
    uploadedFiles: [],
    checkedIds: [],
    count: 0,
    items: []
};

const ACTION_HANDLERS: any = {
    [fetchColorSizesAction]: {
        next: (
            state: State.Products,
            action: Type.ReduxAction<Pick<State.Products, 'colors' | 'sizes'>>
        ): State.Products => ({
            ...state,
            ...action.payload,
            loading: false,
            isFetched: true
        }),
        throw: (state: State.Products): State.Products => ({
            ...state,
            loading: false,
            isFetched: true
        })
    },
    [addUploadedFile]: (
        state: State.Products,
        action: Type.ReduxAction<State.Products>
    ): State.Products => {
        return <Products.Root>{
            ...state,
            uploadedFiles: [...state.uploadedFiles, action.payload]
        };
    },
    [removeUploadedFile]: (
        state: State.Products,
        action: Type.ReduxAction<State.Products>
    ): State.Products => {
        return <Products.Root>{
            ...state,
            uploadedFiles: state.uploadedFiles.filter(
                (file) => file.lastModified !== (action.payload as any).lastModified
            )
        };
    },
    [fetchProductsAction]: {
        next: (
            state: State.Products,
            action: Type.ReduxAction<Pick<State.Notifications, 'count' | 'items'>>
        ): State.Products => ({
            ...state,
            ...action.payload,
            loading: false,
            isFetched: true
        }),
        throw: (state: State.Products): State.Products => ({
            ...state,
            loading: false,
            isFetched: false
        })
    },
    [bulkDeleteAction]: (
        state: State.Products,
        action: Type.ReduxAction<State.Products>
    ): State.Products => {
        return <Products.Root>{
            ...state
        };
    }
};

export { fetchColorSizesAction, addUploadedFile, removeUploadedFile, bulkDeleteAction };

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
