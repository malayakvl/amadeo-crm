import { ProductForm } from './index';
import React from 'react';

interface PropsProduct {
    locale: string;
    productData: any;
}

const AddProduct: React.FC<PropsProduct> = ({ productData, locale }) => {
    return (
        <>
            <ProductForm productData={productData} locale={locale} />
        </>
    );
};

export default AddProduct;
