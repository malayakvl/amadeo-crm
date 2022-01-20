import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { itemsCountSelector, paginatedItemsSelector } from '../../redux/chatbot/selectors';
import { fetchDataAction } from '../../redux/chatbot';
import { PaginationType } from '../../constants';
import { DataTable } from '../_common';
import { Row } from './index';

const ListMessages: React.FC = () => {
    const dispatch = useDispatch();
    const items = useSelector(paginatedItemsSelector);
    const count = useSelector(itemsCountSelector);

    const sendRequest = useCallback(() => {
        return dispatch(fetchDataAction('users'));
    }, [dispatch]);

    return (
        <div className="mt-7">
            <DataTable
                paginationType={PaginationType.CHATBOT}
                totalAmount={count}
                sendRequest={sendRequest}>
                {items?.map((item: any) => (
                    <Row key={item.id} item={item} />
                ))}
            </DataTable>
        </div>
    );
};

export default ListMessages;
