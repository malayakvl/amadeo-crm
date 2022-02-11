import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
// import { itemsCountSelector, paginatedItemsSelector } from '../../redux/livesessions/selectors';
import { PaginationType } from '../../constants';
import { DataTable } from '../_common';
import { fetchItemsAction } from '../../redux/livesessions';
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
        <div className="mt-7 min-w-max">
            <DataTable
                paginationType={PaginationType.PAYMENTS_TRANSACTION_DETAILS}
                totalAmount={count}
                sendRequest={sendRequest}
                hidePaginationBar>
                {items?.map((item: any, index: number) => (
                    <tr key={index}>
                        <td className="w-2">
                            <button>
                                <Image
                                    width="12"
                                    height="14"
                                    src={`/images/action-arrow.svg`}
                                    className="text-orange-450"
                                />
                            </button>
                        </td>

                        <td className="flex items-center">Product Name</td>

                        <td>
                            <div className="text-right">4698.21 &euro;</div>
                        </td>
                    </tr>
                ))}
            </DataTable>

            <div className="mt-4 pt-4 text-gray-350 text-lg text-right border-t border-gray-200">
                + VAT (20%)
                <span className="ml-4 font-bold">4698.21 &euro;</span>
            </div>

            <div className="text-gray-350 text-2xl text-right">
                Order total
                <span className="ml-4 font-bold">4698.21 &euro;</span>
            </div>
        </div>
    );
};

export default ListTransactions;
