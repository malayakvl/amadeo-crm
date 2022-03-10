import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import {
    FilterPayment,
    FilterStatus,
    FilterAmount,
    FilterCountry,
    FilterDelivery,
    FilterNumber,
    FilterDate,
    FilterSeller
} from './index';
import { fetchFilerItems } from '../../redux/orders';
import { userSelector } from '../../redux/user/selectors';
import { setPaginationAction } from '../../redux/layouts';
import { PaginationType } from '../../constants';

const Filters: React.FC<any> = () => {
    const t = useTranslations();
    const dispatch = useDispatch();
    const user = useSelector(userSelector);

    useEffect(() => {
        dispatch(fetchFilerItems());
    }, []);

    const reset = () => {
        dispatch(
            setPaginationAction({
                type: PaginationType.ORDERS,
                modifier: {
                    filters: {
                        order_number: '',
                        shipping_id: [],
                        country_id: [],
                        payment_id: [],
                        status: [],
                        total_amount: [],
                        created_at: [],
                        seller_id: []
                    },
                    offset: 0
                }
            })
        );
    };

    return (
        <div className="right-8 -top-14 bg-white absolute md:right-36 w-80 p-6 shadow-xl rounded-3xl filters">
            <div className="pb-3 border-b flex justify-between mb-4">
                <div className="text-gray-350 font-bold text-xl">{t('Filters')}</div>
                <span
                    className="float-right text-sm mt-1.5 text-gray-350 presentaion cursor-pointer"
                    role="presentation"
                    onClick={() => reset()}>
                    {t('Reset')}
                </span>
            </div>
            <div>
                <FilterNumber />

                <FilterDate />

                {user.role_id === 3 && <FilterSeller />}

                <FilterAmount />

                <FilterStatus />

                <FilterPayment />

                <FilterCountry />

                <FilterDelivery />
            </div>
        </div>
    );
};

export default Filters;
