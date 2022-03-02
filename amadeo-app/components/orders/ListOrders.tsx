import React, { Fragment, useCallback, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import {
    itemsCountSelector,
    paginatedItemsSelector,
    showDatePopupSelector
} from '../../redux/orders/selectors';
import { PaginationType } from '../../constants';
import { DataTable } from '../_common';
import { fetchItemsAction, showDateSelectorAction } from '../../redux/orders';
import moment from 'moment';
import Image from 'next/image';
import { baseApiUrl } from '../../constants';
import { checkIdsAction, setPaginationAction } from '../../redux/layouts';
import { useTranslations } from 'next-intl';
import { Filters, FilterValues, ListItems } from './index';
import { checkedIdsSelector, paginationSelectorFactory } from '../../redux/layouts/selectors';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const userProfileImg =
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

const ListOrders: React.FC = () => {
    const t = useTranslations();
    const dispatch = useDispatch();
    const items = useSelector(paginatedItemsSelector);
    const count = useSelector(itemsCountSelector);
    const checkedIds = useSelector(checkedIdsSelector);
    const { filters }: Layouts.Pagination = useSelector(
        paginationSelectorFactory(PaginationType.ORDERS)
    );
    const [state, setState] = useState<any>([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);
    const showDatePopup = useSelector(showDatePopupSelector);

    const [showMoreConfigs, setShowMoreConfigs] = useState<any>({});
    const [filterOpen, setFilterOpen] = useState(false);

    const sendRequest = useCallback(() => {
        return dispatch(fetchItemsAction());
    }, [dispatch]);

    const handleShowMore = (orderId: number) => {
        const nextCheckedItems = { ...showMoreConfigs };
        nextCheckedItems[orderId] = !nextCheckedItems[orderId];
        setShowMoreConfigs(nextCheckedItems);
    };

    return (
        <div className="mt-7">
            <div className="flex border border-l-0 border-r-0 border-t-0 pb-5 mb-10 relative">
                <h2 className="dark-blue-header">
                    {t('Orders')}
                    <span className="text-gray-180 font-normal text-sm"> {count} items</span>
                </h2>
                {filterOpen && <Filters />}
                {showDatePopup && (
                    <div
                        className="absolute shadow-xl rounded-3xl"
                        style={{ right: '29rem', zIndex: 10 }}>
                        <DateRangePicker
                            onChange={(item) => {
                                setState([item.selection]);
                                dispatch(
                                    setPaginationAction({
                                        type: PaginationType.ORDERS,
                                        modifier: {
                                            filters: {
                                                ...filters,
                                                created_at: [
                                                    moment(item.selection.startDate).format(
                                                        'YYYY-MM-DD'
                                                    ),
                                                    moment(item.selection.endDate).format(
                                                        'YYYY-MM-DD'
                                                    )
                                                ]
                                            },
                                            offset: 0
                                        }
                                    })
                                );
                            }}
                            // showSelectionPreview={true}
                            moveRangeOnFirstSelection={false}
                            months={1}
                            ranges={state}
                            direction="horizontal"
                        />
                    </div>
                )}
                <button
                    onClick={() => {
                        if (filterOpen) {
                            dispatch(showDateSelectorAction(false));
                        }
                        setFilterOpen(!filterOpen);
                    }}
                    className="absolute top-0 right-0 flex items-center text-sm border rounded-lg px-4 py-1">
                    <Image width={16} height={16} src={'/images/filter.svg'} />
                    <div className="font-medium text-gray-400 ml-2">{t('Filters')}</div>
                    <div className="ml-2 font-bold rounded-full p-[2px] text-center bg-gray-400 text-xs h-5 w-5 text-white">
                        {filters.country_id.length +
                            filters.payment_id.length +
                            filters.status.length +
                            filters.seller_id.length +
                            !!filters.total_amount.length +
                            !!filters.created_at.length +
                            filters.country_id.length}
                    </div>
                </button>
            </div>
            <div className="mb-5">
                <FilterValues />
            </div>
            <DataTable
                paginationType={PaginationType.ORDERS}
                totalAmount={count}
                sendRequest={sendRequest}>
                {items?.map((item: any) => (
                    <Fragment key={item.id}>
                        <tr>
                            <td>
                                <input
                                    className="float-checkbox"
                                    type="checkbox"
                                    onChange={() => dispatch(checkIdsAction(item.id))}
                                    value={item.id}
                                    checked={
                                        checkedIds.find((data: any) => data.id === item.id)
                                            ?.checked || false
                                    }
                                />
                            </td>
                            <td style={{ width: '50px' }}>
                                <i
                                    role="presentation"
                                    className="icon-tbl-triangle cursor-pointer"
                                    style={{ marginTop: '5px' }}
                                    onClick={() => handleShowMore(item.id)}
                                />
                            </td>
                            <td className="order-number">
                                <Link href={`/orders/${item.order_number}`}>
                                    <a>{item.order_number}</a>
                                </Link>
                            </td>
                            <td className="order-status">
                                <span className={item.status}>{item.status}</span>
                            </td>
                            <td className="order-date">
                                {moment(item.created_at).format('DD/MM/YYYY')}
                            </td>
                            <td>
                                <div className="flex">
                                    <Image
                                        src={
                                            item.buyer_photo
                                                ? baseApiUrl + item.buyer_photo
                                                : userProfileImg
                                        }
                                        width={24}
                                        height={24}
                                        className="rounded-full cursor-pointer"
                                        alt=""
                                    />
                                    <span className="pl-3">{item.buyer_first_name}</span>
                                </div>
                            </td>
                            <td>
                                {item.flag_name && (
                                    <img
                                        src={`/images/flags/${item.flag_name.toLowerCase()}.svg`}
                                        className="fill-current text-black"
                                        alt={''}
                                    />
                                )}
                            </td>
                            <td>
                                {item.shipping_image && (
                                    <Image
                                        src={baseApiUrl + item.shipping_image}
                                        width={36}
                                        height={24}
                                        className=""
                                        alt=""
                                    />
                                )}
                            </td>
                            <td>
                                <img
                                    src="/images/payments/maestro.svg"
                                    className="fill-current text-black"
                                    alt={''}
                                />
                            </td>
                            <td className="order-date">
                                {item.order_items.length}x{' '}
                                <span className="red-yellow-gradient-text">product (s)</span>
                            </td>
                            <td>{item.total_amount} &euro;</td>
                        </tr>
                        <tr className={!showMoreConfigs[item.id] ? 'hidden' : ''}>
                            <td />
                            <td colSpan={10} style={{ borderLeft: 'solid 1px red' }}>
                                <ListItems items={item.order_items} orderId={item.order_number} />
                            </td>
                        </tr>
                    </Fragment>
                ))}
            </DataTable>
        </div>
    );
};

export default ListOrders;
