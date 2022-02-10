import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { itemsCountSelector, paginatedItemsSelector } from '../../redux/orders/selectors';
import { PaginationType } from '../../constants';
import { DataTable } from '../_common';
import { fetchItemsAction } from '../../redux/orders';
import moment from 'moment';
import Image from 'next/image';
import { baseApiUrl } from '../../constants';
import { checkIdsAction } from '../../redux/layouts';
import { useTranslations } from 'next-intl';

const userProfileImg =
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

const ListMessages: React.FC = () => {
    const t = useTranslations();
    const dispatch = useDispatch();
    const items = useSelector(paginatedItemsSelector);
    const count = useSelector(itemsCountSelector);

    console.log(items);
    const sendRequest = useCallback(() => {
        return dispatch(fetchItemsAction());
    }, [dispatch]);

    return (
        <div className="mt-7">
            <div className="flex border border-l-0 border-r-0 border-t-0 pb-5 mb-10">
                <h2 className="dark-blue-header">
                    {t('Orders')}
                    <span className="text-gray-180 font-normal text-sm"> {count} items</span>
                </h2>
            </div>
            <DataTable
                paginationType={PaginationType.ORDERS}
                totalAmount={count}
                sendRequest={sendRequest}>
                {items?.map((item: any) => (
                    <tr key={item.id}>
                        <td>
                            <td>
                                <input
                                    className="float-checkbox"
                                    type="checkbox"
                                    onChange={() => dispatch(checkIdsAction(item.id))}
                                    value={item.id}
                                    // checked={
                                    //     checkedIds.find((data: any) => data.id === item.id)
                                    //         ?.checked || false
                                    // }
                                />
                            </td>
                        </td>
                        <td>
                            <i className="icon-tbl-triangle" style={{ marginTop: '5px' }} />
                        </td>
                        <td className="order-number">{item.order_number}</td>
                        <td className="order-status">
                            <span className={item.status}>{item.status}</span>
                        </td>
                        <td className="order-date">
                            {moment(item.created_at).format('DD/MM/YYYY')}
                        </td>
                        <td>
                            <div className="flex">
                                <Image
                                    src={item.photo ? baseApiUrl + item.photo : userProfileImg}
                                    width={24}
                                    height={24}
                                    className="rounded-full cursor-pointer"
                                    alt=""
                                />
                                <span className="pl-3">{item.first_name}</span>
                            </div>
                        </td>
                        <td>
                            <img
                                src={`/images/flags/Country=${item.flag_name}.svg`}
                                className="fill-current text-black"
                                alt={''}
                            />
                        </td>
                        <td>
                            <Image
                                src={baseApiUrl + item.shipping_image}
                                width={36}
                                height={24}
                                className=""
                                alt=""
                            />
                        </td>
                        <td>
                            <img
                                src="/images/payments/Payment method=Maestro.svg"
                                className="fill-current text-black"
                                alt={''}
                            />
                        </td>
                        <td className="order-date">
                            1x <span className="red-yellow-gradient-text ">Some products</span>
                        </td>
                        <td>{item.total_amount} &euro;</td>
                        {/*<td>{item.product_cnt ? item.product_cnt : '-'}</td>*/}
                        {/*<td>{item.user_cnt ? item.user_cnt : '-'}</td>*/}
                    </tr>
                ))}
            </DataTable>
        </div>
    );
};

export default ListMessages;
