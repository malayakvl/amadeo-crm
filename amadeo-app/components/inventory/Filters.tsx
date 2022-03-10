import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useDispatch } from 'react-redux';
import { FilterSearch, FilterColor, FilterSize, FilterPrice, FilterQuantity } from './index';
import { fetchFilerItems } from '../../redux/orders';
import { setPaginationAction } from '../../redux/layouts';
import { PaginationType } from '../../constants';

const Filters: React.FC<any> = () => {
    const t = useTranslations();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilerItems());
    }, []);

    const reset = () => {
        dispatch(
            setPaginationAction({
                type: PaginationType.PRODUCTS,
                modifier: {
                    filters: {
                        product_name: '',
                        color_id: [],
                        size_id: [],
                        price: [],
                        quantity: []
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
                <FilterSearch />

                <FilterPrice />

                <FilterQuantity />

                <FilterColor />

                <FilterSize />
            </div>
        </div>
    );
};

export default Filters;
