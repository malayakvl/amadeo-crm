import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { itemsCountSelector, paginatedItemsSelector } from '../../redux/chatbot/selectors';
import { PaginationType } from '../../constants';
import { DataTable } from '../_common';
import { fetchItemsAction } from '../../redux/livesessions';

const ListMessages: React.FC = () => {
    const dispatch = useDispatch();
    const items = useSelector(paginatedItemsSelector);
    const count = useSelector(itemsCountSelector);

    const sendRequest = useCallback(() => {
        return dispatch(fetchItemsAction());
    }, [dispatch]);

    return (
        <div className="mt-7">
            <DataTable
                paginationType={PaginationType.LIVESESSIONS}
                totalAmount={count}
                sendRequest={sendRequest}>
                {items?.map((item: any) => (
                    <tr key={item.id}>
                        <td />
                        <td />
                        <td />
                        <td />
                        <td />
                    </tr>
                ))}
            </DataTable>
        </div>
    );
};

export default ListMessages;
