import { Action, handleActions } from 'redux-actions';
import {
    fetchAdditionalAction,
    addUploadedFile,
    removeUploadedFile,
    fetchProductsAction,
    fetchProductAction,
    bulkDeleteAction,
    setActiveTabAction,
    setEmptyProductAction,
    setSelectedColorsAction,
    setSelectedSizesAction,
    setSelectedAdditionalAction,
    findTagAction
} from './actions';

const initialState: {
    uploadedFiles: any[];
    product: Products.Product;
    checkedIds: any[];
    additional: {
        sizes: any[];
        colors: any[];
        styles: any[];
        materials: any[];
    };
    selectedAdditionals: Products.Additionals;
    isFetched: boolean;
    count: number;
    loading: boolean;
    items: any[];
    products: any[];
    activeTab: string;
    tagSuggestions: any[];
} = {
    additional: {
        colors: [],
        sizes: [],
        styles: [],
        materials: []
    },
    selectedAdditionals: {
        colors: [],
        sizes: [],
        styles: [],
        materials: []
    },
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
            selectedSizes: [],
            selectedStyles: [],
            selectedMaterials: []
        },
        configurations: []
    } as unknown as Products.Product,
    loading: false,
    isFetched: false,
    uploadedFiles: [],
    checkedIds: [],
    count: 0,
    items: [],
    tagSuggestions: [],
    activeTab: 'products'
};

const ACTION_HANDLERS: any = {
    [fetchAdditionalAction]: {
        next: (
            state: State.Products,
            action: Type.ReduxAction<Pick<State.Products, 'additional'>>
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
    [setSelectedAdditionalAction]: {
        next: (state: State.Products, action: Action<any>): State.Products => ({
            ...state,
            selectedAdditionals: action.payload
        })
    },
    [setSelectedColorsAction]: {
        next: (state: State.Products, action: Action<any>): State.Products => ({
            ...state,
            products: action.payload
        })
    },
    [setSelectedSizesAction]: {
        next: (state: State.Products, action: Action<any>): State.Products => ({
            ...state,
            selectedSizes: action.payload
        })
    },
    [findTagAction]: {
        next: (state: State.Products, action: Action<any>): State.Products => ({
            ...state,
            tagSuggestions: action.payload
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
                    keywords: '',
                    selectedColors: [],
                    selectedSizes: []
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
    fetchAdditionalAction,
    addUploadedFile,
    removeUploadedFile,
    bulkDeleteAction,
    fetchProductsAction,
    fetchProductAction,
    setSelectedSizesAction,
    setSelectedColorsAction,
    setSelectedAdditionalAction,
    findTagAction
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
