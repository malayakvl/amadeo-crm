import { handleActions } from 'redux-actions';
import { fetchColorSizesAction } from './actions';

const initialState: State.Products = {
    colors: [],
    sizes: [],
    products: [],
    product: {} as Products.Product,
    loading: false,
    isFetched: false
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
    }
};

export { fetchColorSizesAction };

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(ACTION_HANDLERS, initialState as any);
