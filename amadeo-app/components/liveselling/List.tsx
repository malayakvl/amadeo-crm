import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { itemsCountSelector, paginatedItemsSelector } from '../../redux/livesessions/selectors';
import { PaginationType } from '../../constants';
import { DataTable } from '../_common';
import { fetchItemsAction } from '../../redux/livesessions';
import { stopSessionAction } from '../../redux/livesessions/actions';
import moment from 'moment';
import { useTranslations } from 'next-intl';

const ListMessages: React.FC = () => {
    const dispatch = useDispatch();
    const items = useSelector(paginatedItemsSelector);
    const count = useSelector(itemsCountSelector);
    const t = useTranslations();

    const [closedSessions, setClosedSession] = useState<number[]>([]);

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
                        <td>
                            {item.order_timer
                                ? item.order_timer.days
                                    ? `${item.order_timer.days} day(s)`
                                    : `${item.order_timer.hours} hour(s)`
                                : ''}
                        </td>
                        <td>{item.status}</td>
                        <td>
                            {!item.closed && !closedSessions.includes(item.id) && (
                                <span
                                    onClick={() => {
                                        dispatch(stopSessionAction(item.id));
                                        setClosedSession([...closedSessions, item.id]);
                                    }}
                                    role="presentation"
                                    className="text-[10px] bg-red-200 rounded-lg p-1.5 cursor-pointer">
                                    {t('Stop Session')}
                                </span>
                            )}
                            {(item.closed || closedSessions.includes(item.id)) && (
                                <span
                                    className="text-[10px] bg-green-200 rounded-lg p-1.5"
                                    style={{ backgroundColor: 'rgb(167, 243, 208)' }}>
                                    {t('Closed')}
                                </span>
                            )}
                        </td>
                        {/*<td>{item.product_cnt ? item.product_cnt : '-'}</td>*/}
                        {/*<td>{item.user_cnt ? item.user_cnt : '-'}</td>*/}
                    </tr>
                ))}
            </DataTable>
        </div>
    );
};

export default ListMessages;
