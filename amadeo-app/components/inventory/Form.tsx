import * as Yup from 'yup';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { Formik } from 'formik';
import { InputSwitcher, InputText } from '../_form';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { MultiSelect } from 'react-multi-select-component';
import { fetchColorSizesAction, removeUploadedFile } from '../../redux/products';
import {
    productColorSelector,
    productSizesSelector,
    selectedColorsSelector,
    selectedSizesSelector,
    uploadedFilesSelector
} from '../../redux/products/selectors';
import { parseTranslation } from '../../lib/functions';
import { addUploadedFile, updateProductAction } from '../../redux/products/actions';
import { baseApiUrl } from '../../constants';

const RenderPropsTable: React.FC<any> = ({ colors, sizes, props }) => {
    const _colors: any[] = [];
    const _sizes: any[] = [];
    colors.forEach((_color: any) => {
        _colors.push(_color.label);
    });
    sizes.forEach((_size: any) => {
        _sizes.push(_size.label);
    });
    const attributes = {
        color: _colors.length > 0 ? _colors : ['none'],
        size: _sizes.length > 0 ? _sizes : ['none']
    };
    let attrs = [];
    for (const [attr, values] of Object.entries(attributes)) {
        attrs.push(values.map((v: any) => ({ [attr]: v })));
    }

    attrs = attrs.reduce((a, b) => a.flatMap((d: any) => b.map((e: any) => ({ ...d, ...e }))));
    return (
        <>
            {(_colors.length > 0 || _sizes.length > 0) && (
                <table className="min-w-full float-table mt-3 mb-3">
                    <thead>
                        <tr>
                            <th>Variant</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attrs.map((attr: any, index) => (
                            <tr key={index}>
                                <td>
                                    {attr.color !== 'none' ? attr.color : ''}{' '}
                                    {attr.color !== 'none' && attr.size !== 'none' ? ' / ' : ''}
                                    {attr.size !== 'none' ? attr.size : ''}
                                </td>
                                <td>
                                    <InputText
                                        icon={null}
                                        label={null}
                                        name={`configurePrice_${attr.color}_${attr.size}`}
                                        placeholder={'Price'}
                                        style={'w-[150px]'}
                                        props={props}
                                    />
                                </td>
                                <td>
                                    <InputText
                                        icon={null}
                                        label={null}
                                        name={`configureQty_${attr.color}_${attr.size}`}
                                        placeholder={'Quantity'}
                                        style={'w-[150px]'}
                                        props={props}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

function ProductForm({
    locale,
    productData,
    photos
}: {
    locale: string;
    productData: Products.Product;
    photos: string[];
}) {
    const t = useTranslations();
    const dispatch = useDispatch();
    const colors = useSelector(productColorSelector);
    const sizes = useSelector(productSizesSelector);
    const [dropColors, setDropColors] = useState([]);
    const [dropSizes, setDropSizes] = useState([]);
    const uploadedFiles = useSelector(uploadedFilesSelector);
    const productSelectedColor = useSelector(selectedColorsSelector);
    const productSelectedSize = useSelector(selectedSizesSelector);

    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const removeFile = (file: File) => {
        dispatch(removeUploadedFile(file));
    };

    const prepareConfigValues = (values: any, selectedColors: any[], selectedSizes: any[]) => {
        const configurations: { color_id: any; size_id: any; price: any; qty: any }[] = [];
        if (selectedColors.length > 0 && selectedSizes.length > 0) {
            selectedColors.forEach((color: any) => {
                selectedSizes.forEach((size: any) => {
                    configurations.push({
                        color_id: color.value,
                        size_id: size.value,
                        price: values[`configurePrice_${color.label}_${size.label}`],
                        qty: values[`configureQty_${color.label}_${size.label}`]
                    });
                });
            });
        } else if (selectedColors.length > 0 && selectedSizes.length === 0) {
            selectedColors.forEach((color: any) => {
                configurations.push({
                    color_id: color.value,
                    size_id: null,
                    price: values[`configurePrice_${color.label}_none`],
                    qty: values[`configureQty_${color.label}_none`]
                });
            });
        } else if (selectedColors.length === 0 && selectedSizes.length > 0) {
            selectedSizes.forEach((size: any) => {
                configurations.push({
                    color_id: null,
                    size_id: size.value,
                    price: values[`configurePrice_none_${size.label}`],
                    qty: values[`configureQty_none_${size.label}`]
                });
            });
        }
        return configurations;
    };

    useEffect(() => {
        setSelectedSizes(productSelectedSize);
        setSelectedColors(productSelectedColor);
    }, [productSelectedColor, productSelectedSize]);

    useEffect(() => {
        acceptedFiles.forEach((file: File) => {
            dispatch(addUploadedFile(file));
        });
    }, [acceptedFiles]);

    useEffect(() => {
        dispatch(fetchColorSizesAction());
    }, []);

    useEffect(() => {
        if (colors.length > 0) {
            const _colors: any = [];
            colors.forEach((color) => {
                _colors.push({ label: parseTranslation(color, 'name', locale), value: color.id });
            });
            setDropColors(_colors);
        }
        if (sizes.length > 0) {
            const _sizes: any = [];
            sizes.forEach((size) => {
                _sizes.push({ label: parseTranslation(size, 'name', locale), value: size.id });
            });
            setDropSizes(_sizes);
        }
    }, [colors, sizes]);

    const SubmitSchema = Yup.object().shape({
        // name: Yup.string().required(t('Required field')),
        // description: Yup.string().required(t('Required field')),
        // price: !values.configured ? Yup.number().required(t('Required field')) : Yup.number(),
        // quantity:
        //     !values.configured ? Yup.number().required(t('Required field')) : Yup.number()
    });
    return (
        <Formik
            enableReinitialize
            initialValues={productData.product}
            validationSchema={SubmitSchema}
            onSubmit={(values) => {
                const formData = new FormData();
                Object.keys(values).forEach((key: string) => {
                    formData.append(key, (values as any)[key]);
                });
                formData.append(
                    'configurations',
                    JSON.stringify(prepareConfigValues(values, selectedColors, selectedSizes))
                );
                formData.append('colors', JSON.stringify(selectedColors));
                formData.append('sizes', JSON.stringify(selectedSizes));
                if (uploadedFiles.length) {
                    uploadedFiles.forEach((file: any) => {
                        formData.append('photos[]', file);
                    });
                }
                dispatch(updateProductAction(formData));
            }}>
            {(props) => (
                <form onSubmit={props.handleSubmit} className="mt-5">
                    <div className="grid grid-cols-4 gap-4">
                        <div className="flex-col mb-4">
                            <h2 className="form-subtitle">Product images</h2>
                            <section className="drop-zone-container">
                                <div {...getRootProps({ className: 'dropzone' })}>
                                    <input {...getInputProps()} />
                                    <p>Drag and drop image file(s), or browse your computer.</p>
                                </div>
                                {(uploadedFiles.length > 0 || photos.length > 0) && (
                                    <aside>
                                        <h4>Uploaded Files</h4>
                                        {/*<ul>{files}</ul>*/}
                                        <ul>
                                            {uploadedFiles.map((_file: File) => (
                                                <li key={_file.lastModified}>
                                                    <img
                                                        src={URL.createObjectURL(_file)}
                                                        alt=""
                                                        className="object-cover h-[85px]"
                                                    />
                                                    <span>{_file.name}</span>{' '}
                                                    <em>{_file.size} bytes</em>{' '}
                                                    <i
                                                        className="close"
                                                        role="presentation"
                                                        onClick={() => {
                                                            removeFile(_file);
                                                        }}
                                                    />
                                                </li>
                                            ))}
                                            {photos.map((_file: string, _index) => (
                                                <li key={_index}>
                                                    <img
                                                        src={`${baseApiUrl}/${_file}`}
                                                        alt=""
                                                        className="object-cover h-[85px]"
                                                    />
                                                    <span>{_file}</span> <em>&nbsp;</em>{' '}
                                                    <i
                                                        className="close"
                                                        role="presentation"
                                                        onClick={() => {
                                                            console.log(_file);
                                                        }}
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                    </aside>
                                )}
                            </section>
                        </div>
                        <div className="flex-col ml-4">
                            <h2 className="form-subtitle">Product details</h2>
                            <InputText
                                icon={null}
                                label={'Product Name'}
                                name={'name'}
                                placeholder={'Product Name'}
                                style={null}
                                props={props}
                            />

                            <InputText
                                icon={null}
                                label={'Product Description'}
                                name={'description'}
                                placeholder={'Product Description'}
                                style={null}
                                props={props}
                            />
                            {props.values.configured && (
                                <>
                                    <InputText
                                        icon={null}
                                        label={'Product Price'}
                                        name={'price'}
                                        placeholder={'Product Price'}
                                        style={null}
                                        props={props}
                                    />

                                    <InputText
                                        icon={null}
                                        label={'Quantity'}
                                        name={'quantity'}
                                        placeholder={'Quantity'}
                                        style={null}
                                        props={props}
                                    />
                                </>
                            )}
                            <InputText
                                icon={null}
                                label={'Product Keyword'}
                                name={'keyword'}
                                placeholder={'Product Keyword'}
                                style={null}
                                props={props}
                            />

                            <InputSwitcher
                                label={'Configured'}
                                name={'configured'}
                                style={null}
                                props={props}
                                onChange={props.handleChange}
                            />
                            {props.values.configured && (
                                <>
                                    <div className="mb-4 relative">
                                        <label className="control-label">{t('Color')}</label>
                                        <MultiSelect
                                            options={dropColors}
                                            value={selectedColors}
                                            onChange={setSelectedColors}
                                            labelledBy="Select size"
                                        />
                                    </div>

                                    <div className="mb-4 relative">
                                        <label className="control-label">{t('Size')}</label>
                                        <MultiSelect
                                            options={dropSizes}
                                            value={selectedSizes}
                                            onChange={setSelectedSizes}
                                            labelledBy="Select size"
                                        />
                                    </div>

                                    <RenderPropsTable
                                        colors={selectedColors}
                                        sizes={selectedSizes}
                                        props={props}
                                    />
                                </>
                            )}

                            <InputSwitcher
                                label={'Publish'}
                                name={'publish'}
                                style={null}
                                props={props}
                                onChange={props.handleChange}
                            />

                            <button type="submit" className="gradient-btn">
                                {props.values.id ? t('Update Product') : t('Add Product')}
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    );
}

export default ProductForm;
