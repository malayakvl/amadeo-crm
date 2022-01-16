import React, { useEffect, useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import { productAdditionalSelector, productsCountSelector } from '../../redux/products/selectors';
import { prepareAdditionalDropdown } from '../../lib/functions';
import { setPaginationAction } from '../../redux/layouts';
import { paginationSelectorFactory } from '../../redux/layouts/selectors';
import { PaginationType } from '../../constants';
import { FilterValues } from './index';

const InventoryFilters: React.FC<any> = (locale: string) => {
    const t = useTranslations();
    const dispatch = useDispatch();

    const additionalProps = useSelector(productAdditionalSelector);
    const { filters }: Layouts.Pagination = useSelector(
        paginationSelectorFactory(PaginationType.PRODUCTS)
    );
    const colorNode = useRef<HTMLDivElement>(null);
    const sizeNode = useRef<HTMLDivElement>(null);
    const count = useSelector(productsCountSelector);

    const [showFilterValues, setShowFilterValues] = useState(false);
    const [dataFetched, setDataFetched] = useState(false);
    const [filterAdditionals, setFilterAdditionals] = useState({});
    const [colorSelected, setColorSelected] = useState<any>(filters.color_id);
    const [sizeSelected, setSizeSelected] = useState<any>(filters.size_id);
    const [showColorFilter, setShowColorFilter] = useState(false);
    const [showSizeFilter, setShowSizeFilter] = useState(false);
    const [searchName, setSearchName] = useState(filters.product_name);
    const [priceRange, setPriceRange] = useState(
        filters.price[0] > 0 || filters.price[1] > 0 ? filters.price : [0, 0]
    );
    const [qtyRange, setQtyRange] = useState(
        filters.quantity[0] > 0 || filters.quantity[1] > 0 ? filters.quantity : [0, 0]
    );
    useEffect(() => {
        setPriceRange([additionalProps.priceRange.min, additionalProps.priceRange.min]);
        setQtyRange([additionalProps.qtyRange.min, additionalProps.qtyRange.min]);
        setFilterAdditionals({
            colors: prepareAdditionalDropdown(additionalProps.colors, locale),
            sizes: prepareAdditionalDropdown(additionalProps.sizes, locale)
        });
        setDataFetched(true);
    }, [additionalProps]);

    useEffect(() => {
        setColorSelected(filters.color_id);
        setSizeSelected(filters.size_id);
        setPriceRange(filters.price[0] > 0 || filters.price[1] > 0 ? filters.price : [0, 0]);
        setQtyRange(filters.quantity[0] > 0 || filters.quantity[1] > 0 ? filters.quantity : [0, 0]);
        setSearchName(filters.product_name);
    }, [filters]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, []);

    const handleClick = (e: any) => {
        if (colorNode?.current?.contains(e.target)) {
            return;
        }
        if (sizeNode?.current?.contains(e.target)) {
            return;
        }
        setShowColorFilter(false);
        setShowSizeFilter(false);
    };

    const handleColorFilter = (e: any) => {
        if (e.target.checked) {
            setColorSelected([...colorSelected, parseInt(e.target.value)]);
        } else {
            setColorSelected(colorSelected.filter((id: any) => id !== e.target.value));
        }
    };

    const handleSizeFilter = (e: any) => {
        if (e.target.checked) {
            setSizeSelected([...sizeSelected, parseInt(e.target.value)]);
        } else {
            setSizeSelected(sizeSelected.filter((id: any) => id !== e.target.value));
        }
    };

    const onSliderPriceChange = (_value: any) => {
        setPriceRange(_value);
    };
    const onSliderQtyChange = (_value: any) => {
        setQtyRange(_value);
    };

    const resetFilters = () => {
        dispatch(
            setPaginationAction({
                type: PaginationType.PRODUCTS,
                modifier: {
                    filters: {
                        ...filters,
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

    const applyFilters = () => {
        setShowFilterValues(true);
        dispatch(
            setPaginationAction({
                type: PaginationType.PRODUCTS,
                modifier: {
                    filters: {
                        ...filters,
                        product_name: searchName,
                        color_id: colorSelected,
                        size_id: sizeSelected,
                        price:
                            priceRange[0] === priceRange[1] &&
                            priceRange[0] === additionalProps.priceRange.min
                                ? []
                                : priceRange,
                        quantity:
                            qtyRange[0] === qtyRange[1] &&
                            qtyRange[0] === additionalProps.qtyRange.min
                                ? []
                                : qtyRange
                    },
                    offset: 0
                }
            })
        );
    };

    return (
        <>
            {dataFetched && (
                <>
                    <h2 className="filters-caption">{t('Filters')}</h2>
                    <div className="flex filters">
                        <div className="flex">
                            <div>
                                <input
                                    type="text"
                                    className="form-control lg:min-w-[250px]"
                                    placeholder="Product Name"
                                    value={searchName}
                                    onChange={(e) => setSearchName(e.target.value)}
                                />
                            </div>
                            <div className="relative ml-3">
                                <div className="block ml-2">
                                    <span className="filter-label">
                                        {t('Color')}
                                        <em>
                                            {colorSelected.length}/
                                            {(filterAdditionals as any).colors.length}
                                        </em>
                                    </span>
                                    <div
                                        className="w-full text-xs"
                                        role="presentation"
                                        onClick={() => setShowColorFilter(!showColorFilter)}>
                                        <input type="checkbox" />
                                        <div className="arrow ml-5" />
                                    </div>
                                </div>
                                {showColorFilter && (
                                    <div className="dropdown-menu min-w-[200px]" ref={colorNode}>
                                        <span
                                            className="filter-close"
                                            role="presentation"
                                            onClick={() => setShowColorFilter(false)}
                                        />
                                        <ul className="py-1">
                                            {(filterAdditionals as any).colors.map((color: any) => (
                                                <li className="notice-item" key={color.value}>
                                                    <span className="block">
                                                        <input
                                                            type="checkbox"
                                                            id={`color_${color.value}`}
                                                            value={color.value}
                                                            checked={colorSelected.includes(
                                                                color.value
                                                            )}
                                                            onChange={(e) => handleColorFilter(e)}
                                                        />
                                                        <label htmlFor={`color_${color.value}`}>
                                                            {color.label}
                                                        </label>
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div className="relative ml-3">
                                <div className="block ml-2">
                                    <span className="filter-label">
                                        {t('Size')}
                                        <em>
                                            {sizeSelected.length}/
                                            {(filterAdditionals as any).sizes.length}
                                        </em>
                                    </span>
                                    <div
                                        className="w-full text-xs"
                                        role="presentation"
                                        onClick={() => setShowSizeFilter(!showSizeFilter)}>
                                        <input type="checkbox" />
                                        <div className="arrow ml-6" />
                                    </div>
                                </div>
                                {showSizeFilter && (
                                    <div className="dropdown-menu min-w-[200px]" ref={sizeNode}>
                                        <span
                                            className="filter-close"
                                            role="presentation"
                                            onClick={() => setShowSizeFilter(false)}
                                        />
                                        <ul className="py-1">
                                            {(filterAdditionals as any).sizes.map((size: any) => (
                                                <li className="notice-item-size" key={size.value}>
                                                    <span className="block">
                                                        <input
                                                            type="checkbox"
                                                            id={`size_${size.value}`}
                                                            value={size.value}
                                                            checked={sizeSelected.includes(
                                                                size.value
                                                            )}
                                                            onChange={(e) => handleSizeFilter(e)}
                                                        />
                                                        <label htmlFor={`size_${size.value}`}>
                                                            {size.label}
                                                        </label>
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                            <div className="relative ml-5 w-[105px]">
                                <div className="block ml-2">
                                    <span className="filter-label" style={{ marginLeft: '-4px' }}>
                                        {t('Price')}
                                        <em className="float-right">
                                            {priceRange[0]} -{' '}
                                            {priceRange[0] === priceRange[1]
                                                ? additionalProps.priceRange.max
                                                : priceRange[1]}
                                            &euro;
                                        </em>
                                    </span>
                                    <Range
                                        allowCross={false}
                                        step={50}
                                        min={additionalProps.priceRange.min}
                                        max={additionalProps.priceRange.max}
                                        onChange={onSliderPriceChange}
                                        value={priceRange}
                                    />
                                </div>
                            </div>
                            <div className="relative ml-5 w-[105px]">
                                <div className="block ml-2">
                                    <span className="filter-label" style={{ marginLeft: '-4px' }}>
                                        {t('Quantity')}
                                        <em className="float-right">
                                            {qtyRange[0]} -{' '}
                                            {qtyRange[1] === qtyRange[0]
                                                ? additionalProps.qtyRange.max
                                                : qtyRange[1]}
                                        </em>
                                    </span>
                                    <Range
                                        allowCross={false}
                                        step={10}
                                        min={additionalProps.qtyRange.min}
                                        max={additionalProps.qtyRange.max}
                                        onChange={onSliderQtyChange}
                                        value={qtyRange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="ml-10">
                            <button className="cancel mr-2.5" onClick={() => resetFilters()}>
                                {t('Reset')}
                            </button>
                            <button className="gradient-btn" onClick={() => applyFilters()}>
                                {t('Apply')}
                            </button>
                        </div>
                    </div>
                    {showFilterValues && (
                        <div className="flex border border-l-0 border-r-0 border-b-0 pt-5 mt-6">
                            <h2 className="dark-blue-header">
                                Search Results{' '}
                                <span className="text-gray-180 font-normal text-sm">
                                    ({count} Results)
                                </span>
                            </h2>
                            <FilterValues locale={locale} />
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default InventoryFilters;
