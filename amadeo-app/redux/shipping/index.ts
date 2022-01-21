import { fetchShippingsAction } from "./actions";
import { handleActions } from 'redux-actions';

const initialState: State.Shippings = []

const ACTION_HANDLERS: any = {
    [fetchShippingsAction]: {
        next: (
            state: State.Shippings,
            action: Type.ReduxAction<State.Shippings>
        ): State.Shippings => action.payload,
    },
}

export default handleActions(ACTION_HANDLERS, initialState as any);