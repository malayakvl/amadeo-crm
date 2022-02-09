import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { itemsCountSelector, paginatedItemsSelector } from '../../redux/livesessions/selectors';
import { PaginationType } from '../../constants';
import { DataTable } from '../_common';
import { fetchItemsAction } from '../../redux/livesessions';
// import moment from 'moment';
import Image from 'next/image';

const items = [1, 2, 3, 4, 5];

const ListTransactions: React.FC = () => {
    const dispatch = useDispatch();
    // const items = useSelector(paginatedItemsSelector);
    const count = items.length; // useSelector(itemsCountSelector);

    const sendRequest = useCallback(() => {
        return dispatch(fetchItemsAction());
    }, [dispatch]);

    return (
        <div className="mt-7">
            <DataTable
                paginationType={PaginationType.PAYMENTS_TRANSACTIONS}
                totalAmount={count}
                sendRequest={sendRequest}>

                {items?.map((item: any) => (
                    <tr key={'item.id'}>
                        <td>
                            <input
                                className="float-checkbox cursor-pointer"
                                type="checkbox"
                                // onChange={() => dispatch(checkIdsAction(item.id))}
                                value={'item.id'}
                                // checked={
                                //     checkedIds.find((data: any) => data.id === item.id)?.checked ||
                                //     false
                                // }
                            />
                        </td>
                        <td>12345</td>
                        <td>01/11/2021</td>
                        <td>12345</td>
                        <td>User name</td>
                        <td><Image
                                width={24}
                                height={24}
                                src="/images/bitcoin.svg"
                                layout="fixed"
                                alt=""
                            /></td>
                        <td>4698.21</td>
                        <td className="w-1 cursor-pointer">
                            <Image
                                width={24}
                                height={24}
                                src="/images/dots.svg"
                                layout="fixed"
                                alt=""
                            />
                        </td>
                    </tr>
                ))}
            </DataTable>
        </div>
    );
};

export default ListTransactions;
