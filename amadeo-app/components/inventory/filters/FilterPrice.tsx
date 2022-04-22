import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { paginationSelectorFactory } from '../../../redux/layouts/selectors';
import { PaginationType } from '../../../constants';
import { setPaginationAction } from '../../../redux/layouts';
import Image from 'next/image';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { productAdditionalSelector } from '../../../redux/products/selectors';
import { formatCurrency, isNumber } from '../../../lib/functions';

const filterPrice: React.FC<any> = () => {
    const t = useTranslations();
    const dispatch = useDispatch();
    const { filters }: Layouts.Pagination = useSelector(
        paginationSelectorFactory(PaginationType.PRODUCTS)
    );
    const filterData: Products.Root['additional'] = useSelector(productAdditionalSelector);
    const [showBlock, setShowBlock] = useState<boolean>(true);

    const [priceRange, setPriceRange] = useState<number[]>([]);

    const onSliderPriceChange = (_value: any) => {
        _value[0] = isNumber(_value[0]) ? +_value[0] : filterData.priceRange.min;
        _value[1] = isNumber(_value[1]) ? +_value[1] : filterData.priceRange.max;

        if (_value[0] > _value[1]) _value[1] = _value[0];

        setPriceRange(_value);
    };

    useEffect(() => {
        if (filters.price.length === 0) {
            setPriceRange([filterData.priceRange.min, filterData.priceRange.max]);
        } else {
            setPriceRange(filters.price);
        }
    }, [filters.price, filterData.priceRange]);

    const changePriceDone = () => {
        if (
            priceRange[0] == filterData.priceRange.min &&
            priceRange[1] == filterData.priceRange.max
        ) {
            dispatch(
                setPaginationAction({
                    type: PaginationType.PRODUCTS,
                    modifier: {
                        filters: {
                            ...filters,
                            price: []
                        },
                        offset: 0
                    }
                })
            );
        } else {
            dispatch(
                setPaginationAction({
                    type: PaginationType.PRODUCTS,
                    modifier: {
                        filters: {
                            ...filters,
                            price: priceRange
                        },
                        offset: 0
                    }
                })
            );
        }
    };

    const onSliderAfterChange = () => {
        changePriceDone();
    };

    const handleFocus = (e: any) => {
        e.target.select();
    };

    return (
        <div className="mb-4">
            <div
                role="presentation"
                className="flex justify-between mb-2 mt-3 cursor-pointer"
                onClick={() => setShowBlock(!showBlock)}>
                <div className="flex items-center">
                    <Image width="10" height="10" src={'/images/lang-arrow.svg'} />
                    <span className="ml-2 text-xs font-bold text-blue-350">{t('Price')}</span>
                </div>
                <div className="text-sm font-thin text-gray-450">
                    {priceRange[0]} - {priceRange[1]} &euro;
                </div>
            </div>
            {showBlock && (
                <>
                    <div className="block ml-2">
                        <span className="filter-label" style={{ marginLeft: '-4px' }}>
                            {t('Price')}
                            <em className="float-right">
                                {filterData.priceRange.min} - {filterData.priceRange.max}
                                &euro;
                            </em>
                        </span>
                        <Range
                            allowCross={false}
                            step={1}
                            min={filterData.priceRange.min}
                            max={filterData.priceRange.max}
                            onChange={onSliderPriceChange}
                            onAfterChange={onSliderAfterChange}
                            value={priceRange}
                        />
                    </div>
                    <div className="flex mt-1">
                        <div className="w-1/2 mr-2">
                            <div className="mb-3 text-xs font-bold text-blue-350">
                                {t('Minimum')}
                            </div>
                            <input
                                className="w-full form-control"
                                type="text"
                                placeholder={formatCurrency(filterData.priceRange.min)}
                                onChange={(e) => {
                                    onSliderPriceChange([e.target.value, priceRange[1]]);
                                }}
                                onFocus={handleFocus}
                                onKeyUp={() => changePriceDone()}
                                value={priceRange[0]}
                            />
                        </div>
                        <div className="w-1/2">
                            <div className="mb-3 text-xs font-bold text-blue-350">
                                {t('Maximum')}
                            </div>
                            <input
                                className="w-full form-control"
                                type="text"
                                placeholder={formatCurrency(filterData.priceRange.max)}
                                onChange={(e) => {
                                    onSliderPriceChange([priceRange[0], e.target.value]);
                                }}
                                onFocus={handleFocus}
                                onKeyUp={() => changePriceDone()}
                                value={priceRange[1]}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default filterPrice;
