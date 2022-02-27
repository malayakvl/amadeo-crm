import React, { Fragment } from 'react';
import Link from 'next/link';
import moment from 'moment';
import { useTranslations } from 'next-intl';

const ListOrders: React.FC<{ orders: Orders.DataItem[] }> = ({ orders }) => {
    const t = useTranslations();

    return (
        <table className="min-w-full float-table">
            <thead>
                <tr>
                    <th>{t('ID')}</th>
                    <th>{t('Status')}</th>
                    <th>{t('Date')}</th>
                    <th>{t('Shoppers')}</th>
                    <th>{t('Country')}</th>
                    <th>{t('Product')}</th>
                    <th>{t('Total')}</th>
                </tr>
            </thead>

            <tbody className="bg-white">
                {orders?.map((item: any) => (
                    <Fragment key={item.id}>
                        <tr>
                            <td className="red-yellow-gradient-text">
                                <Link href={`/orders/${item.order_number}`}>
                                    <a>{item.order_number}</a>
                                </Link>
                            </td>
                            <td>
                                <span className={item.status}>{item.status}</span>
                                {/* <span className="payed">payed</span>
                                    <span className="shipped">shipped</span>
                                    <span className="canceled">canceled</span> */}
                            </td>
                            <td>{moment(item.created_at).format('DD/MM/YYYY')}</td>
                            <td>{item.buyer_first_name}</td>
                            <td>{item.flag_name}</td>
                            <td>Entry</td>
                            <td>{item.total_amount} €</td>
                        </tr>
                    </Fragment>
                ))}
            </tbody>
        </table>
    );
};

export default ListOrders;
