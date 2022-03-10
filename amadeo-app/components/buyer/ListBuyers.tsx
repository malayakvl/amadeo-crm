import React, { Fragment, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { itemsCountSelector, paginatedItemsSelector } from '../../redux/buyers/selectors';
import { PaginationType, baseApiUrl } from '../../constants';
import { DataTable } from '../_common';
import { ListOrders } from './';

import { fetchItemsAction } from '../../redux/buyers';
import Image from 'next/image';

const userProfileImg =
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

const ListBuyers: React.FC = () => {
    const dispatch = useDispatch();

    const items: Buyers.DataItem[] = useSelector(paginatedItemsSelector);
    const count: number = useSelector(itemsCountSelector);

    const [showMoreConfigs, setShowMoreConfigs] = useState<boolean[]>([]);

    const handlerShowMore = (index: number) => {
        const nextCheckedItems = { ...showMoreConfigs };
        nextCheckedItems[index] = !nextCheckedItems[index];
        setShowMoreConfigs(nextCheckedItems);
    };

    const sendRequest = useCallback(() => {
        // dispatch(fetchOrdersAction());
        return dispatch(fetchItemsAction());
    }, [dispatch]);

    return (
        <div className="mt-7">
            <DataTable
                hideBulk
                paginationType={PaginationType.BUYERS}
                totalAmount={count}
                sendRequest={sendRequest}>
                {items?.map((item) => (
                    <Fragment key={item.buyer_id}>
                        <tr>
                            <td>
                                {item.order_items?.length > 0 ? (
                                    <button
                                        role="switch"
                                        tabIndex={0}
                                        aria-checked={showMoreConfigs[item.buyer_id]}
                                        aria-labelledby="showMore"
                                        onClick={() => handlerShowMore(item.buyer_id)}
                                        onKeyDown={(e) =>
                                            (e.key === ' ' || e.key === 'Enter') &&
                                            handlerShowMore(item.buyer_id)
                                        }>
                                        <Image
                                            width="14"
                                            height="14"
                                            src={`/images/action-arrow.svg`}
                                            className={
                                                showMoreConfigs[item.buyer_id] ? 'rotate-90' : ''
                                            }
                                        />
                                    </button>
                                ) : null}
                            </td>
                            <td>
                                <div
                                    className="flex cursor-pointer"
                                    onClick={() => handlerShowMore(item.buyer_id)}
                                    onKeyDown={(e) =>
                                        (e.key === ' ' || e.key === 'Enter') &&
                                        handlerShowMore(item.buyer_id)
                                    }
                                    role="switch"
                                    tabIndex={0}
                                    aria-checked={showMoreConfigs[item.buyer_id]}
                                    aria-labelledby="showMore">
                                    <div className="relative w-8 h-8">
                                        <Image
                                            src={
                                                item.buyer_photo
                                                    ? baseApiUrl + item.buyer_photo
                                                    : userProfileImg
                                            }
                                            width={42}
                                            height={42}
                                            className="rounded-full cursor-pointer"
                                            alt="buyer photo"
                                        />
                                    </div>
                                    <div className="ml-2">
                                        <div>{item.buyer_first_name}</div>
                                        {/* <div className="font-normal text-xs">{item.username}</div> */}
                                        <div className="font-medium text-xs text-orange-450">
                                            {item.buyer_email}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="flex">
                                    <div className="relative w-8">
                                        {item.country_iso && (
                                            <img
                                                width={35}
                                                height={24}
                                                src={`/images/flags/${item.country_iso.toLowerCase()}.svg`}
                                                className="fill-current text-black"
                                                alt={''}
                                            />
                                        )}
                                    </div>
                                    <div className="ml-2 text-center font-medium">
                                        {item.buyer_phone}
                                    </div>
                                </div>
                            </td>
                            <td style={{ minWidth: '150px' }}>
                                <div className="font-medium">{item.buyer_address}</div>
                            </td>
                            <td>
                                <div className="font-medium">
                                    {item.buyer_full_address?.slice(0, -2)}
                                </div>
                            </td>
                            <td>
                                <div className="text-center text-orange-450">
                                    {item.total_count}
                                </div>
                            </td>
                            <td style={{ minWidth: '150px' }}>
                                <div className="text-right">{item.total_amount}</div>
                            </td>
                        </tr>
                        <tr>
                            <td
                                className={!showMoreConfigs[item.buyer_id] ? 'hidden' : ''}
                                colSpan={7}>
                                <ListOrders orders={item.order_items} />
                            </td>
                        </tr>
                    </Fragment>
                ))}
            </DataTable>
        </div>
    );
};

export default ListBuyers;
