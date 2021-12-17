import { Action, handleActions } from 'redux-actions';
import {
    fetchColorSizesAction,
    addUploadedFile,
    removeUploadedFile,
    fetchProductsAction,
    fetchProductAction,
    bulkDeleteAction,
    setActiveTabAction,
    setEmptyProductAction,
    setSelectedColorsAction,
    setSelectedSizesAction
} from './actions';

const initialState: {
    uploadedFiles: any[];
    product: Products.Product;
    sizes: any[];
    checkedIds: any[];
    isFetched: boolean;
    count: number;
    loading: boolean;
    items: any[];
    colors: any[];
    products: any[];
    activeTab: string;
    selectedColors: any[];
    selectedSizes: any[];
} = {
    colors: [],
    sizes: [],
    products: [],
    product: {
        product: {
            publish: false,
            configured: false,
            name: '',
            description: '',
            price: '',
            quantity: '',
            keywords: '',
            photos: [],
            selectedColors: [],
            selectedSizes: []
        },
        configurations: []
    } as unknown as Products.Product,
    loading: false,
    isFetched: false,
    uploadedFiles: [],
    checkedIds: [],
    count: 0,
    items: [],
    activeTab: 'products',
    selectedColors: [],
    selectedSizes: []
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
    [setSelectedColorsAction]: {
        next: (state: State.Products, action: Action<any>): State.Products => ({
            ...state,
            selectedColors: action.payload
        })
    },
    [setSelectedSizesAction]: {
        next: (state: State.Products, action: Action<any>): State.Products => ({
            ...state,
            selectedSizes: action.payload
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
    [fetchProductAction]: {
        next: (
            state: State.Products,
            action: Type.ReduxAction<Pick<State.Products, 'product'>>
        ): State.Products => ({
            ...state,
            ...action.payload,
            loading: false,
            isFetched: true,
            uploadedFiles: []
        }),
        throw: (state: State.Products): State.Products => ({
            ...state,
            loading: false,
            isFetched: true,
            uploadedFiles: []
        })
    },
    [bulkDeleteAction]: (state: State.Products): State.Products => {
        return <Products.Root>{
            ...state
        };
    },
    [setActiveTabAction]: {
        next: (state: State.Products, action: Action<string>): State.Products => ({
            ...state,
            activeTab: action.payload
        })
    },
    [setEmptyProductAction]: (state: State.Products): State.Products => {
        return <Products.Root>(<unknown>{
            ...state,
            product: {
                product: {
                    publish: false,
                    configured: false,
                    name: '',
                    description: '',
                    price: '',
                    quantity: '',
                    keywords: ''
                },
                configurations: []
            },
            isFetched: true,
            selectedColors: [],
            selectedSizes: [],
            uploadedFiles: []
        });
    }
};

export {
    fetchColorSizesAction,
    addUploadedFile,
    removeUploadedFile,
    bulkDeleteAction,
    fetchProductsAction,
    fetchProductAction,
    setSelectedSizesAction,
    setSelectedColorsAction
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
