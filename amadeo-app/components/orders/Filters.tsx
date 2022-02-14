import React, { useEffect, useState } from 'react';
import { InputText } from '../_form';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useSelector } from 'react-redux';
import { paginationSelectorFactory } from '../../redux/layouts/selectors';
import { PaginationType } from '../../constants';
import { FilterPayment, FilterStatus } from './index';

const Filters: React.FC<any> = () => {
    const t = useTranslations();
    // const dispatch = useDispatch();
    const { filters }: Layouts.Pagination = useSelector(
        paginationSelectorFactory(PaginationType.ORDERS)
    );
    const [priceRange, setPriceRange] = useState(
        filters.order_amount[0] > 0 || filters.order_amount[1] > 0 ? filters.order_amount : [0, 0]
    );

    const onSliderPriceChange = (_value: any) => {
        setPriceRange(_value);
    };

    useEffect(() => {
        console.log('get filter data');
    }, []);

    return (
        <div className="-top-14 bg-white absolute right-36 w-80 p-6 shadow-xl rounded-3xl filters">
            <div className="pb-3 border-b flex justify-between">
                <div className="text-gray-350 font-bold text-xl">{t('Filters')}</div>
            </div>
            {/*<InputText*/}
            {/*    style="mt-5 w-full"*/}
            {/*    icon={''}*/}
            {/*    label={null}*/}
            {/*    name={'name'}*/}
            {/*    placeholder={t('Start typing to search')}*/}
            {/*    props={{*/}
            {/*        // handleChange: () => {},*/}
            {/*        values: { name: '' },*/}
            {/*        errors: { name: '' }*/}
            {/*    }}*/}
            {/*    tips={null}*/}
            {/*/>*/}
            <div className="flex justify-between mb-2">
                <div className="flex items-center">
                    <Image width="10" height="10" src={'/images/lang-arrow.svg'} />
                    <span className="ml-2 text-xs font-bold text-blue-350">{t('Spent')}</span>
                </div>
                <div className="text-sm font-thin text-gray-450">999,99,9$</div>
            </div>
            <div className="block ml-2">
                <span className="filter-label" style={{ marginLeft: '-4px' }}>
                    {t('Price')}
                    <em className="float-right">
                        {priceRange[0]} - {priceRange[0] === priceRange[1] ? 0 : priceRange[1]}
                        &euro;
                    </em>
                </span>
                <Range
                    allowCross={false}
                    step={50}
                    min={0}
                    max={10000}
                    onChange={onSliderPriceChange}
                    value={priceRange}
                />
            </div>
            <div className="flex mt-1">
                <div className="w-1/2 mr-2">
                    <div className="mb-3 text-xs font-bold text-blue-350">{t('Minimum')}</div>
                    <InputText
                        style="w-full"
                        icon={''}
                        label={null}
                        name={'name'}
                        placeholder={t('0,00$')}
                        props={{
                            // handleChange: () => {},
                            values: { name: '' },
                            errors: { name: '' }
                        }}
                        tips={null}
                    />
                </div>
                <div className="w-1/2">
                    <div className="mb-3 text-xs font-bold text-blue-350">{t('Maximum')}</div>
                    <InputText
                        style="w-full"
                        icon={''}
                        label={null}
                        name={'name'}
                        placeholder={t('999,999$')}
                        props={{
                            // handleChange: () => {},
                            values: { name: '' },
                            errors: { name: '' }
                        }}
                        tips={null}
                    />
                </div>
            </div>
            <>
                <FilterStatus />
            </>
            <>
                <FilterPayment />
            </>
            {/*<div className="flex justify-between mb-3">*/}
            {/*    <div className="flex items-center">*/}
            {/*        <Image width="10" height="10" src={'/images/lang-arrow.svg'} />*/}
            {/*        <span className="ml-2 text-xs font-bold text-blue-350">{t('Country')}</span>*/}
            {/*    </div>*/}
            {/*    <div className="font-bold rounded-full text-center p-[2px] bg-green-250 text-xs h-5 w-5 text-white">*/}
            {/*        3*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<InputText*/}
            {/*    style="w-full pb-4 border-b mb-6"*/}
            {/*    icon={''}*/}
            {/*    label={null}*/}
            {/*    name={'name'}*/}
            {/*    placeholder={t('Type to search for...')}*/}
            {/*    props={{*/}
            {/*        // handleChange: () => {},*/}
            {/*        values: { name: '' },*/}
            {/*        errors: { name: '' }*/}
            {/*    }}*/}
            {/*    tips={null}*/}
            {/*/>*/}
            {/*<div className="flex items-center mb-3">*/}
            {/*    <input*/}
            {/*        id="acceptTerms"*/}
            {/*        name="acceptTerms"*/}
            {/*        className="text-green-250 border-green-250 w-5 h-5 border-2 rounded mr-2.5"*/}
            {/*        type="checkbox"*/}
            {/*    />*/}
            {/*    <Image width="40" height="24" src={'/images/en-flag.svg'} />*/}
            {/*    <span className="ml-2 text-xs font-bold text-blue-350">*/}
            {/*        {t('America')}*/}
            {/*    </span>*/}
            {/*</div>*/}
        </div>
    );
};

export default Filters;
