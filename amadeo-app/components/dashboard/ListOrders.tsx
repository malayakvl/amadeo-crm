import React, { Fragment } from 'react';
import Link from 'next/link';
import moment from 'moment';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { baseApiUrl } from '../../constants';

const userProfileImg =
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

const ListOrders: React.FC<{ orders: Orders.DataItem[] }> = ({ orders }) => {
    const t = useTranslations();

    return (
        <table className="min-w-full float-table text-left">
            <thead>
                <tr>
                    <th>{t('ID')}</th>
                    <th>{t('Status')}</th>
                    <th>{t('Date')}</th>
                    <th>{t('Shoppers')}</th>
                    <th>{t('Country')}</th>
                    <th className="text-right">{t('Product')}</th>
                    <th className="text-right">{t('Total')}</th>
                </tr>
            </thead>

            <tbody className="bg-white">
                {orders?.map((item) => (
                    <Fragment key={item.id}>
                        <tr>
                            <td className="red-yellow-gradient-text">
                                <Link href={`/orders/${item.order_number}`}>
                                    <a>{item.order_number}</a>
                                </Link>
                            </td>
                            <td>
                                <span className={item.status}>{item.status}</span>
                            </td>
                            <td>{moment(item.created_at).format('DD/MM/YYYY')}</td>
                            {/*<td>{item.buyer_first_name}</td>*/}
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
                                        alt="buyer"
                                    />
                                    <span className="pl-3">{item.buyer_first_name}</span>
                                </div>
                            </td>
                            <td>
                                {item.flag_name && (
                                    <img
                                        src={`/images/flags/${item.flag_name.toLowerCase()}.svg`}
                                        className="fill-current text-black"
                                        alt={item.flag_name}
                                    />
                                )}
                            </td>
                            <td>
                                <div className="text-right">
                                    {item.order_items?.length} x product (s)
                                </div>
                            </td>
                            <td>
                                <div className="text-right">{item.total_amount} €</div>
                            </td>
                        </tr>
                    </Fragment>
                ))}
            </tbody>
        </table>
    );
};

export default ListOrders;
