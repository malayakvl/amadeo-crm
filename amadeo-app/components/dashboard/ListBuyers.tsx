import React, { Fragment } from 'react';
import { useTranslations } from 'next-intl';

const ListBuyers: React.FC<{ buyers: Buyers.DataItem[] }> = ({ buyers }) => {
    const t = useTranslations();

    return (
        <table className="min-w-full float-table">
            <thead>
                <tr>
                    <th>{t('ID')}</th>
                    <th>{t('Shoppers')}</th>
                    <th>{t('Orders')}</th>
                    <th>{t('Total Spent')}</th>
                    <th>{t('Country')}</th>
                </tr>
            </thead>

            <tbody className="bg-white">
                {buyers?.map((item: any) => (
                    <Fragment key={item.buyer_id}>
                        <tr>
                            <td className="red-yellow-gradient-text">{item.buyer_id}</td>
                            <td>{item.buyer_first_name}</td>
                            <td>123</td>
                            <td>{item.total_amount} €</td>
                            <td>{item.country_name}</td>
                        </tr>
                    </Fragment>
                ))}
            </tbody>
        </table>
    );
};

export default ListBuyers;
