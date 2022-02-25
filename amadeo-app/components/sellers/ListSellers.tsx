import React, { Fragment, useCallback, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import {
    itemsCountSelector,
    paginatedItemsSelector,
    showDatePopupSelector
} from '../../redux/sellers/selectors';
import { PaginationType } from '../../constants';
import { DataTable } from '../_common';
import { fetchItemsAction } from '../../redux/sellers';
import moment from 'moment';
import Image from 'next/image';
import { baseApiUrl } from '../../constants';
import { setPaginationAction } from '../../redux/layouts';
import { useTranslations } from 'next-intl';
import { Filters, FilterValues } from './index';
import { paginationSelectorFactory } from '../../redux/layouts/selectors';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const userProfileImg =
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

const ListSellers: React.FC = () => {
    const t = useTranslations();
    const dispatch = useDispatch();
    const items = useSelector(paginatedItemsSelector);
    const count = useSelector(itemsCountSelector);
    const { filters }: Layouts.Pagination = useSelector(
        paginationSelectorFactory(PaginationType.SELLERS)
    );
    const [state, setState] = useState<any>([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);
    const showDatePopup = useSelector(showDatePopupSelector);

    const [filterOpen, setFilterOpen] = useState(false);

    const sendRequest = useCallback(() => {
        return dispatch(fetchItemsAction());
    }, [dispatch]);

    return (
        <div className="mt-7">
            <div className="flex border border-l-0 border-r-0 border-t-0 pb-5 mb-10 relative">
                <h2 className="dark-blue-header">
                    {t('Sellers')}
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
                    onClick={() => setFilterOpen(!filterOpen)}
                    className="absolute top-0 right-0 flex items-center text-sm border rounded-lg px-4 py-1">
                    <Image width={16} height={16} src={'/images/filter.svg'} />
                    <div className="font-medium text-gray-400 ml-2">{t('Filters')}</div>
                    <div className="ml-2 font-bold rounded-full p-[2px] text-center bg-gray-400 text-xs h-5 w-5 text-white">
                        {filters.country_id.length}
                    </div>
                </button>
            </div>
            <div className="mb-5">
                <FilterValues />
            </div>
            <DataTable
                paginationType={PaginationType.SELLERS}
                totalAmount={count}
                sendRequest={sendRequest}>
                {items?.map((item: any) => (
                    <Fragment key={item.id}>
                        <tr>
                            <td className="order-number">
                                <div className="flex">
                                    <div>
                                        <Image
                                            src={
                                                item.photo
                                                    ? baseApiUrl + item.photo
                                                    : userProfileImg
                                            }
                                            width={24}
                                            height={24}
                                            className="rounded-full  "
                                            alt=""
                                        />
                                    </div>
                                    <span className="pl-3">
                                        {item.first_name} {item.last_name}
                                        <span className="block text-blue-350">{item.email}</span>
                                    </span>
                                </div>
                            </td>
                            <td>{item.phone}</td>
                            <td>{item.full_address}</td>
                            <td>{item.total_sessions}</td>
                            <td>{item.total_count}</td>
                            <td>{item.total_buyers}</td>
                            <td>{item.total_amount} &euro;</td>
                            <td className="order-date">
                                {moment(item.created_at).format('DD/MM/YYYY')}
                            </td>
                            <td>
                                <Link href={`/orders/${item.order_number}`}>LogIn</Link>
                            </td>
                        </tr>
                    </Fragment>
                ))}
            </DataTable>
        </div>
    );
};

export default ListSellers;
