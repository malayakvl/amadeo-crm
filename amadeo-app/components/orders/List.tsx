import React, { Fragment, useCallback, useState } from 'react';
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
import { Filters, ListItems } from './index';
import { checkedIdsSelector } from '../../redux/layouts/selectors';

const userProfileImg =
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

const ListMessages: React.FC = () => {
    const t = useTranslations();
    const dispatch = useDispatch();
    const items = useSelector(paginatedItemsSelector);
    const count = useSelector(itemsCountSelector);
    const checkedIds = useSelector(checkedIdsSelector);

    const [showMoreConfigs, setShowMoreConfigs] = useState<any>({});
    const [filterOpen, setFilterOpen] = useState(true);

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
                {/*{filterOpen && (*/}
                {/*    <div className="-top-14 bg-white absolute right-36 w-80 p-6 shadow-xl rounded-3xl">*/}
                {/*        <div className="pb-3 border-b flex justify-between">*/}
                {/*            <div className="text-gray-350 font-bold text-xl">{t('Filters')}</div>*/}
                {/*        </div>*/}
                {/*        <InputText*/}
                {/*            style="mt-5 w-full"*/}
                {/*            icon={''}*/}
                {/*            label={null}*/}
                {/*            name={'name'}*/}
                {/*            placeholder={t('Start typing to search')}*/}
                {/*            props={{*/}
                {/*                // handleChange: () => {},*/}
                {/*                values: { name: '' },*/}
                {/*                errors: { name: '' }*/}
                {/*            }}*/}
                {/*            tips={null}*/}
                {/*        />*/}
                {/*        <div className="flex justify-between mb-2">*/}
                {/*            <div className="flex items-center">*/}
                {/*                <Image width="10" height="10" src={'/images/lang-arrow.svg'} />*/}
                {/*                <span className="ml-2 text-xs font-bold text-blue-350">*/}
                {/*                    {t('Spent')}*/}
                {/*                </span>*/}
                {/*            </div>*/}
                {/*            <div className="text-sm font-thin text-gray-450">999,99,9$</div>*/}
                {/*        </div>*/}
                {/*        <input*/}
                {/*            className="w-full"*/}
                {/*            type="range"*/}
                {/*            min="0"*/}
                {/*            max="100"*/}
                {/*            step="1"*/}
                {/*            value="50"*/}
                {/*        />*/}
                {/*        <div className="flex mt-1">*/}
                {/*            <div className="w-1/2 mr-2">*/}
                {/*                <div className="mb-3 text-xs font-bold text-blue-350">*/}
                {/*                    {t('Minimum')}*/}
                {/*                </div>*/}
                {/*                <InputText*/}
                {/*                    style="w-full"*/}
                {/*                    icon={''}*/}
                {/*                    label={null}*/}
                {/*                    name={'name'}*/}
                {/*                    placeholder={t('0,00$')}*/}
                {/*                    props={{*/}
                {/*                        // handleChange: () => {},*/}
                {/*                        values: { name: '' },*/}
                {/*                        errors: { name: '' }*/}
                {/*                    }}*/}
                {/*                    tips={null}*/}
                {/*                />*/}
                {/*            </div>*/}
                {/*            <div className="w-1/2">*/}
                {/*                <div className="mb-3 text-xs font-bold text-blue-350">*/}
                {/*                    {t('Maximum')}*/}
                {/*                </div>*/}
                {/*                <InputText*/}
                {/*                    style="w-full"*/}
                {/*                    icon={''}*/}
                {/*                    label={null}*/}
                {/*                    name={'name'}*/}
                {/*                    placeholder={t('999,999$')}*/}
                {/*                    props={{*/}
                {/*                        // handleChange: () => {},*/}
                {/*                        values: { name: '' },*/}
                {/*                        errors: { name: '' }*/}
                {/*                    }}*/}
                {/*                    tips={null}*/}
                {/*                />*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className="flex justify-between mb-3">*/}
                {/*            <div className="flex items-center">*/}
                {/*                <Image width="10" height="10" src={'/images/lang-arrow.svg'} />*/}
                {/*                <span className="ml-2 text-xs font-bold text-blue-350">*/}
                {/*                    {t('Country')}*/}
                {/*                </span>*/}
                {/*            </div>*/}
                {/*            <div className="font-bold rounded-full text-center p-[2px] bg-green-250 text-xs h-5 w-5 text-white">*/}
                {/*                3*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <InputText*/}
                {/*            style="w-full pb-4 border-b mb-6"*/}
                {/*            icon={''}*/}
                {/*            label={null}*/}
                {/*            name={'name'}*/}
                {/*            placeholder={t('Type to search for...')}*/}
                {/*            props={{*/}
                {/*                // handleChange: () => {},*/}
                {/*                values: { name: '' },*/}
                {/*                errors: { name: '' }*/}
                {/*            }}*/}
                {/*            tips={null}*/}
                {/*        />*/}
                {/*        <div className="flex items-center mb-3">*/}
                {/*            <input*/}
                {/*                id="acceptTerms"*/}
                {/*                name="acceptTerms"*/}
                {/*                className="text-green-250 border-green-250 w-5 h-5 border-2 rounded mr-2.5"*/}
                {/*                type="checkbox"*/}
                {/*            />*/}
                {/*            <Image width="40" height="24" src={'/images/en-flag.svg'} />*/}
                {/*            <span className="ml-2 text-xs font-bold text-blue-350">*/}
                {/*                {t('America')}*/}
                {/*            </span>*/}
                {/*        </div>*/}
                {/*        <div className="flex items-center mb-3">*/}
                {/*            <input*/}
                {/*                id="acceptTerms"*/}
                {/*                name="acceptTerms"*/}
                {/*                className="text-green-250 border-green-250 w-5 h-5 border-2 rounded mr-2.5"*/}
                {/*                type="checkbox"*/}
                {/*            />*/}
                {/*            <Image width="40" height="24" src={'/images/fr-glag.svg'} />*/}
                {/*            <span className="ml-2 text-xs font-bold text-blue-350">*/}
                {/*                {t('France')}*/}
                {/*            </span>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*)}*/}
                <button
                    onClick={() => setFilterOpen(!filterOpen)}
                    className="absolute top-0 right-0 flex items-center text-sm border rounded-lg px-4 py-1">
                    <Image width={16} height={16} src={'/images/filter.svg'} />
                    <div className="font-medium text-gray-400 ml-2">{t('Filters')}</div>
                    <div className="ml-2 font-bold rounded-full p-[2px] text-center bg-gray-400 text-xs h-5 w-5 text-white">
                        9
                    </div>
                </button>
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
                            <td>
                                <i
                                    role="presentation"
                                    className="icon-tbl-triangle cursor-pointer"
                                    style={{ marginTop: '5px' }}
                                    onClick={() => handleShowMore(item.id)}
                                />
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
                                        src={`/images/flags/${item.flag_name}.svg`}
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
                                <ListItems items={item.order_items} />
                            </td>
                        </tr>
                    </Fragment>
                ))}
            </DataTable>
        </div>
    );
};

export default ListMessages;
