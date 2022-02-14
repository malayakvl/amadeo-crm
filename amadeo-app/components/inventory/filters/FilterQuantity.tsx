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

const FilterQuantity: React.FC<any> = () => {
    const t = useTranslations();
    const dispatch = useDispatch();
    const { filters }: Layouts.Pagination = useSelector(
        paginationSelectorFactory(PaginationType.PRODUCTS)
    );
    const filterData = useSelector(productAdditionalSelector);
    const [showBlock, setShowBlock] = useState<boolean>(true);

    const [quantityRange, setQuantityRange] = useState(
        filters.quantity[0] > 0 || filters.quantity[1] > 0 ? filters.quantity : [0, 0]
    );

    const onSliderPriceChange = (_value: any) => {
        setQuantityRange(_value);
    };

    useEffect(() => {
        if (filters.quantity.length === 0) {
            setQuantityRange([0, 0]);
        } else {
            setQuantityRange(filters.quantity);
        }
    }, [filters.quantity]);

    const changePriceDone = () => {
        if (quantityRange[0] !== quantityRange[1]) {
            console.log(quantityRange);
            dispatch(
                setPaginationAction({
                    type: PaginationType.PRODUCTS,
                    modifier: {
                        filters: {
                            ...filters,
                            quantity: quantityRange
                        },
                        offset: 0
                    }
                })
            );
        } else if (quantityRange[0] === quantityRange[1] && quantityRange[0] === 0) {
            dispatch(
                setPaginationAction({
                    type: PaginationType.PRODUCTS,
                    modifier: {
                        filters: {
                            ...filters,
                            quantity: []
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
                    <span className="ml-2 text-xs font-bold text-blue-350">{t('Quantity')}</span>
                </div>
                <div className="text-sm font-thin text-gray-450">
                    {quantityRange[0]} - {quantityRange[1]}
                </div>
            </div>
            {showBlock && (
                <>
                    <div className="block ml-2">
                        <span className="filter-label" style={{ marginLeft: '-4px' }}>
                            {t('Quantity')}
                            <em className="float-right">
                                {quantityRange[0]} - {filterData.quantity[1]}
                            </em>
                        </span>
                        <Range
                            allowCross={false}
                            step={10}
                            min={0}
                            max={filterData.quantity[1]}
                            onChange={onSliderPriceChange}
                            onAfterChange={onSliderAfterChange}
                            value={quantityRange}
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
                                placeholder={'0'}
                                onChange={(e) => {
                                    onSliderPriceChange([
                                        parseFloat(e.target.value),
                                        quantityRange[1]
                                    ]);
                                }}
                                onKeyUp={() => changePriceDone()}
                                value={quantityRange[0]}
                            />
                        </div>
                        <div className="w-1/2">
                            <div className="mb-3 text-xs font-bold text-blue-350">
                                {t('Maximum')}
                            </div>
                            <input
                                className="w-full form-control"
                                type="text"
                                placeholder={`${filterData.quantity[1]}`}
                                onChange={(e) => {
                                    onSliderPriceChange([
                                        quantityRange[0],
                                        parseFloat(e.target.value)
                                    ]);
                                }}
                                onKeyUp={() => changePriceDone()}
                                value={quantityRange[1]}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default FilterQuantity;
