import React, { Fragment, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    itemsCountSelector,
    paginatedItemsSelector,
    showDatePopupSelector
} from '../../redux/waitingList/selectors';
import { PaginationType } from '../../constants';
import { DataTable } from '../_common';
import { fetchItemsAction } from '../../redux/waitingList';
import moment from 'moment';
import { baseApiUrl } from '../../constants';
import { checkIdsAction, setPaginationAction } from '../../redux/layouts';
import { useTranslations } from 'next-intl';
import { FilterValues, ListItems } from './index';
import { checkedIdsSelector, paginationSelectorFactory } from '../../redux/layouts/selectors';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
import { BanIcon } from '@heroicons/react/solid'; // theme css file

const userProfileImg =
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

const ListMessages: React.FC = () => {
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
    // const [filterOpen, setFilterOpen] = useState(false);

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
                    {t('Waiting List')}
                    <span className="text-gray-180 font-normal text-sm"> {count} items</span>
                </h2>
                {/*{filterOpen && <Filters />}*/}
                {showDatePopup && (
                    <div
                        className="absolute shadow-xl rounded-3xl"
                        style={{ right: '29rem', zIndex: 10 }}>
                        <DateRange
                            editableDateInputs={true}
                            onChange={(item) => {
                                setState([item.selection]);
                                dispatch(
                                    setPaginationAction({
                                        type: PaginationType.WAITING,
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
                            moveRangeOnFirstSelection={false}
                            ranges={state}
                        />
                    </div>
                )}
                {/*<button*/}
                {/*    onClick={() => setFilterOpen(!filterOpen)}*/}
                {/*    className="absolute top-0 right-0 flex items-center text-sm border rounded-lg px-4 py-1">*/}
                {/*    <Image width={16} height={16} src={'/images/filter.svg'} />*/}
                {/*    <div className="font-medium text-gray-400 ml-2">{t('Filters')}</div>*/}
                {/*    <div className="ml-2 font-bold rounded-full p-[2px] text-center bg-gray-400 text-xs h-5 w-5 text-white">*/}
                {/*        {filters.country_id.length +*/}
                {/*            filters.payment_id.length +*/}
                {/*            filters.status.length +*/}
                {/*            filters.country_id.length}*/}
                {/*    </div>*/}
                {/*</button>*/}
            </div>
            <div className="mb-5">
                <FilterValues />
            </div>
            <DataTable
                paginationType={PaginationType.WAITING}
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
                            <td style={{ width: '150px' }}>
                                {item.configuration.previewphoto && (
                                    <img
                                        src={
                                            /(http(s?)):\/\//i.test(item.configuration.previewphoto)
                                                ? item.previewphoto
                                                : `${baseApiUrl}/${item.configuration.previewphoto}`
                                        }
                                        alt=""
                                        className="object-scale-down h-[95px] w-[85px] rounded-lg border p-1.5"
                                    />
                                )}
                                {!item.configuration.previewphoto && (
                                    <div className="border rounded-lg w-[85px] h-[95px] block flex items-center text-center">
                                        <BanIcon
                                            width={30}
                                            height={30}
                                            className="m-auto text-gray-200"
                                        />
                                    </div>
                                )}
                            </td>
                            <td className="order-number">
                                <span className="text-gray-180 text-sm">Ref.</span>{' '}
                                <span className="text-blue-350">
                                    {item.configuration.product_id}
                                </span>{' '}
                                <br />
                                <span className="text-[18px] red-yellow-gradient-text">
                                    {item.configuration.name}
                                </span>
                                <br />
                                {item.configuration.description && (
                                    <div
                                        className="text-blue-350 mt-4 block font-normal text-sm"
                                        dangerouslySetInnerHTML={{
                                            __html: `${item.configuration.description.substring(
                                                0,
                                                250
                                            )} ...`
                                        }}
                                    />
                                )}
                            </td>
                            <td>
                                <div
                                    className="rounded-full w-3 h-3 inline-block mr-1"
                                    style={{
                                        backgroundColor: `${item.configuration.backgroundColor}`
                                    }}
                                />
                            </td>
                            <td className="whitespace-nowrap">{item.configuration.size_name}</td>
                            <td className="order-date">
                                {item.item_buyers.length}x{' '}
                                <span className="red-yellow-gradient-text">buyer (s)</span>
                            </td>
                            {/*<td></td>*/}
                        </tr>
                        <tr className={!showMoreConfigs[item.id] ? 'hidden' : ''}>
                            <td />
                            <td colSpan={6} style={{ borderLeft: 'solid 1px red' }}>
                                <ListItems
                                    items={item.item_buyers}
                                    productId={item.configuration.product_id}
                                    userProfileImg={userProfileImg}
                                />
                            </td>
                        </tr>
                    </Fragment>
                ))}
            </DataTable>
        </div>
    );
};

export default ListMessages;