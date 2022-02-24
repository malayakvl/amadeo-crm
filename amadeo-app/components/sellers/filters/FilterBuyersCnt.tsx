import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { paginationSelectorFactory } from '../../../redux/layouts/selectors';
import { PaginationType } from '../../../constants';
import { setPaginationAction } from '../../../redux/layouts';
import Image from 'next/image';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { filterDataSelector } from '../../../redux/sellers/selectors';

const FilterBuyersCnt: React.FC<any> = () => {
    const t = useTranslations();
    const dispatch = useDispatch();
    const { filters }: Layouts.Pagination = useSelector(
        paginationSelectorFactory(PaginationType.SELLERS)
    );
    const filterData = useSelector(filterDataSelector);
    const [showBlock, setShowBlock] = useState<boolean>(true);

    const [countRange, setCountRange] = useState(
        filters.total_buyers[0] > 0 || filters.total_buyers[1] > 0 ? filters.total_buyers : [0, 0]
    );

    const onSliderPriceChange = (_value: any) => {
        setCountRange(_value);
    };

    useEffect(() => {
        if (filters.total_buyers.length === 0) {
            setCountRange([0, 0]);
        } else {
            setCountRange(filters.total_buyers);
        }
    }, [filters.total_buyers]);

    const changePriceDone = () => {
        if (countRange[0] !== countRange[1]) {
            dispatch(
                setPaginationAction({
                    type: PaginationType.SELLERS,
                    modifier: {
                        filters: {
                            ...filters,
                            total_buyers: countRange
                        },
                        offset: 0
                    }
                })
            );
        } else if (countRange[0] === countRange[1] && countRange[0] === 0) {
            dispatch(
                setPaginationAction({
                    type: PaginationType.SELLERS,
                    modifier: {
                        filters: {
                            ...filters,
                            total_buyers: []
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
                    <span className="ml-2 text-xs font-bold text-blue-350">
                        {t('Buyers Count')}
                    </span>
                </div>
                <div className="text-sm font-thin text-gray-450">
                    {countRange[0]} - {countRange[1]}
                </div>
            </div>
            {showBlock && (
                <>
                    <div className="block ml-2">
                        <span className="filter-label" style={{ marginLeft: '-4px' }}>
                            {t('Count')}
                            <em className="float-right">
                                {countRange[0]} - {filterData.total_buyers[1]}
                                &euro;
                            </em>
                        </span>
                        <Range
                            allowCross={false}
                            step={50}
                            min={0}
                            max={filterData.total_buyers[1]}
                            onChange={onSliderPriceChange}
                            onAfterChange={onSliderAfterChange}
                            value={countRange}
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
                                        countRange[1]
                                    ]);
                                }}
                                onKeyUp={() => changePriceDone()}
                                value={countRange[0]}
                            />
                        </div>
                        <div className="w-1/2">
                            <div className="mb-3 text-xs font-bold text-blue-350">
                                {t('Maximum')}
                            </div>
                            <input
                                className="w-full form-control"
                                type="text"
                                placeholder={`${filterData.total_buyers[1]}`}
                                onChange={(e) => {
                                    onSliderPriceChange([
                                        countRange[0],
                                        parseFloat(e.target.value)
                                    ]);
                                }}
                                onKeyUp={() => changePriceDone()}
                                value={countRange[1]}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default FilterBuyersCnt;