import { createAction } from 'redux-actions';

export const fetchShippingAction: any = createAction(
    'SHIPMENT/FETCH_SHIPMENTS',
    async () =>
        (
            dispatch: Type.Dispatch,
            getState: () => State.Root
        ): Promise<State.Shippings> => {
            return new Promise((resolve) => {
                const result = [
                    {
                        id: 1,
                        method: 'method 1',
                        price: 10,
                        enabled: true,
                    },
                    {
                        id: 2,
                        method: 'method 2',
                        price: 110,
                        enabled: false,
                    },
                    {
                        id: 3,
                        method: 'method 3',
                        price: 20,
                        enabled: true,
                    },
                    {
                        id: 4,
                        method: 'method 4',
                        price: 120,
                        enabled: true,
                    }

                ]
                
                resolve(result)
            })
        }
);
