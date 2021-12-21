import { ProductForm } from './index';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productItemSelector } from '../../redux/products/selectors';
import { prepareAdditionalDropdown } from '../../lib/functions';
import { setSelectedAdditionalAction } from '../../redux/products';

interface PropsProduct {
    locale: string;
}

const EditProduct: React.FC<PropsProduct> = ({ locale }) => {
    const dispatch = useDispatch();
    const productData = useSelector(productItemSelector);
    const [dataFetched, setDataFetched] = useState(false);

    useEffect(() => {
        if (Object.keys(productData.product).length > 0) {
            const _sizes: any = prepareAdditionalDropdown(
                productData.product.selectedSizes,
                locale
            );
            const _colors: any = prepareAdditionalDropdown(
                productData.product.selectedColors,
                locale
            );
            const _styles: any = [];
            const _materials: any = [];
            // if (productData.product.selectedSizes) {
            //     productData.product.selectedSizes.forEach((size: any) => {
            //         _sizes.push({
            //             label: parseTranslation(size, 'name', locale),
            //             value: size.id
            //         });
            //     });
            //     dispatch(setSelectedSizesAction(_sizes));
            // }
            // if (productData.product.selectedColors) {
            //     productData.product.selectedColors.forEach((color: any) => {
            //         _colors.push({
            //             label: parseTranslation(color, 'name', locale),
            //             value: color.id
            //         });
            //     });
            //     dispatch(setSelectedColorsAction(_colors));
            // }
            dispatch(
                setSelectedAdditionalAction({
                    colors: _colors,
                    sizes: _sizes,
                    styles: _styles,
                    materials: _materials
                })
            );

            if (productData.configurations.length > 0) {
                productData.configurations.forEach((configuration: any) => {
                    const conf = configuration.configuration;
                    let index;
                    if (conf.color_id && conf.size_id) {
                        index = `${_colors.find((v: any) => v.value === conf.color_id).label}_${
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
