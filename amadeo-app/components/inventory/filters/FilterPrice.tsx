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

const filterPrice: React.FC<any> = () => {
    const t = useTranslations();
    const dispatch = useDispatch();
    const { filters }: Layouts.Pagination = useSelector(
        paginationSelectorFactory(PaginationType.PRODUCTS)
    );
    const filterData = useSelector(productAdditionalSelector);
    const [showBlock, setShowBlock] = useState<boolean>(true);

    const [priceRange, setPriceRange] = useState(
        filters.price[0] > 0 || filters.price[1] > 0 ? filters.price : [0, 0]
    );

    const onSliderPriceChange = (_value: any) => {
        setPriceRange(_value);
    };

    useEffect(() => {
        if (filters.price.length === 0) {
            setPriceRange([0, 0]);
        } else {
            setPriceRange(filters.price);
        }
    }, [filters.price]);

    const changePriceDone = () => {
        if (priceRange[0] !== priceRange[1]) {
            console.log(priceRange);
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
        } else if (priceRange[0] === priceRange[1] && priceRange[0] === 0) {
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
        }
    };

    const onSliderAfterChange = () => {
        changePriceDone();
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
                                {priceRange[0]} - {filterData.price[1]}
                                &euro;
                            </em>
                        </span>
                        <Range
                            allowCross={false}
                            step={1}
                            min={0}
                            max={filterData.price[1]}
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
                                placeholder={'0 €'}
                                onChange={(e) => {
                                    onSliderPriceChange([
                                        parseFloat(e.target.value),
                                        priceRange[1]
                                    ]);
                                }}
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
                                placeholder={`${filterData.price[1]} €`}
                                onChange={(e) => {
                                    onSliderPriceChange([
                                        priceRange[0],
                                        parseFloat(e.target.value)
                                    ]);
                                }}
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
