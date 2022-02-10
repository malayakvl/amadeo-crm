import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { itemsCountSelector, paginatedItemsSelector } from '../../redux/livesessions/selectors';
import { PaginationType } from '../../constants';
import { DataTable } from '../_common';
import { fetchItemsAction } from '../../redux/livesessions';
import moment from 'moment';

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
                        <td>{moment(item.event_date).format('DD.MM.YYYY')}</td>
                        <td>{item.event_time}</td>
                        <td>{item.status}</td>
                        {/*<td>{item.product_cnt ? item.product_cnt : '-'}</td>*/}
                        {/*<td>{item.user_cnt ? item.user_cnt : '-'}</td>*/}
                    </tr>
                ))}
            </DataTable>
        </div>
    );
};

export default ListMessages;
