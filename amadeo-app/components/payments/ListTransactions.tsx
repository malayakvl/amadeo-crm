import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
// import { itemsCountSelector, paginatedItemsSelector } from '../../redux/livesessions/selectors';
import { PaginationType } from '../../constants';
import { DataTable } from '../_common';
import { fetchItemsAction } from '../../redux/livesessions';
// import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';

const items = [1, 2, 3, 4, 5];
const userProfileImg =
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

const ListTransactions: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    // const items = useSelector(paginatedItemsSelector);
    const count = items.length; // useSelector(itemsCountSelector);

    const sendRequest = useCallback(() => {
        return dispatch(fetchItemsAction());
    }, [dispatch]);

    return (
        <div className="mt-7 min-w-max">
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
                        <td>
                            <div className="text-center text-orange-450">12345</div>
                        </td>
                        <td>01/11/2021</td>
                        <td>
                            <div className="text-center text-orange-450">12345</div>
                        </td>

                        <td className="flex items-center">
                            <div className="relative w-7 h-7 mr-2">
                                <Image
                                    className="rounded-full"
                                    layout="fill"
                                    src={userProfileImg}
                                />
                            </div>
                            User name
                        </td>
                        <td className="text-center">
                            <div className="text-center">
                                <Image
                                    width={24}
                                    height={24}
                                    src="/images/bitcoin.svg"
                                    layout="fixed"
                                    alt="Bitcoin"
                                />
                            </div>
                        </td>
                        <td>
                            <div className="text-right">4698.21 &euro;</div>
                        </td>
                        <td className="w-1">
                            <Link href={`${router.asPath}/transaction/${item}`}>
                                <a>
                                    <Image
                                        width={24}
                                        height={24}
                                        src="/images/dots.svg"
                                        layout="fixed"
                                        alt="Dots vertical"
                                    />
                                </a>
                            </Link>
                        </td>
                    </tr>
                ))}
            </DataTable>
        </div>
    );
};

export default ListTransactions;
