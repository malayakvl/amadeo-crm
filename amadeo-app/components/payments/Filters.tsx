import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { FilterPayment, FilterAmount, FilterNumber, FilterDate, FilterSeller } from './index';
import { fetchFilerItems } from '../../redux/payments';
import { userSelector } from '../../redux/user/selectors';

const Filters: React.FC<any> = () => {
    const t = useTranslations();
    const dispatch = useDispatch();
    const user = useSelector(userSelector);

    useEffect(() => {
        dispatch(fetchFilerItems());
    }, []);

    return (
        <div className="-top-14 bg-white absolute right-36 w-80 p-6 shadow-xl rounded-3xl filters">
            <div className="pb-3 border-b flex justify-between mb-4">
                <div className="text-gray-350 font-bold text-xl">{t('Filters')}</div>
            </div>
            <div>
                <FilterNumber />

                {user.role_id === 3 && <FilterSeller />}

                <FilterDate />

                <FilterAmount />

                <FilterPayment />
            </div>
        </div>
    );
};

export default Filters;
