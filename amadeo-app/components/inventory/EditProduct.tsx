import { ProductForm } from './index';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productItemSelector } from '../../redux/products/selectors';
import { parseTranslation } from '../../lib/functions';
import { setSelectedColorsAction, setSelectedSizesAction } from '../../redux/products';

interface PropsProduct {
    locale: string;
}

const EditProduct: React.FC<PropsProduct> = ({ locale }) => {
    const dispatch = useDispatch();
    const productData = useSelector(productItemSelector);
    const [dataFetched, setDataFetched] = useState(false);

    useEffect(() => {
        if (Object.keys(productData.product).length > 0) {
            const _sizes: any = [];
            const _colors: any = [];
            if (productData.product.selectedSizes.length > 0) {
                productData.product.selectedSizes.forEach((size: any) => {
                    _sizes.push({
                        label: parseTranslation(size, 'name', locale),
                        value: size.id
                    });
                });
                dispatch(setSelectedSizesAction(_sizes));
            }
            if (productData.product.selectedColors.length > 0) {
                productData.product.selectedColors.forEach((color: any) => {
                    _colors.push({
                        label: parseTranslation(color, 'name', locale),
                        value: color.id
                    });
                });
                dispatch(setSelectedColorsAction(_colors));
            }
            if (productData.configurations.length > 0) {
                productData.configurations.forEach((configuration: any) => {
                    const conf = configuration.configuration;
                    let index;
                    if (conf.color_id && conf.size_id) {
                        index = `${_colors.find((v: any) => v.value === conf.color).label}_${
                            _sizes.find((v: any) => v.value === conf.size_id).label
                        }`;
                    } else if (!conf.color_id && conf.size_id) {
                        index = `none_${_sizes.find((v: any) => v.value === conf.size_id).label}`;
                    } else if (conf.color_id && !conf.size_id) {
                        index = `${_colors.find((v: any) => v.value === conf.color).label}_none`;
                    }
                    productData.product[`configurePrice_${index}`] = conf.price;
                    productData.product[`configureQty_${index}`] = conf.price;
                });
            }
            setDataFetched(true);
        }
    }, [dispatch, productData]);

    return (
        <>
            {dataFetched && (
                <ProductForm
                    locale={locale}
                    productData={productData}
                    photos={productData.product.photos || []}
                />
            )}
        </>
    );
};

export default EditProduct;
