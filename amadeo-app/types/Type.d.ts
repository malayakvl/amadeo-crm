declare namespace Type {
    type PaginationType = import('../constants/index').PaginationType;
    type History = import('history').History;
    type Moment = import('moment').Moment;
    type Dispatch = import('redux').Dispatch;
    type ReduxAction<T> = import('redux-actions').Action<T>;

    interface Hash<T> {
        [key: string]: T;
    }
}
