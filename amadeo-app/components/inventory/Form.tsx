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
    uploadedFilesSelector
} from '../../redux/products/selectors';
import { parseTranslation } from '../../lib/functions';
import { addUploadedFile, updateProductAction } from '../../redux/products/actions';

function ProductForm({ productData, locale }: { productData: any; locale: string }) {
    const t = useTranslations();
    const dispatch = useDispatch();
    const colors = useSelector(productColorSelector);
    const sizes = useSelector(productSizesSelector);
    const [dropColors, setDropColors] = useState([]);
    const [dropSizes, setDropSizes] = useState([]);
    const uploadedFiles = useSelector(uploadedFilesSelector);

    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
    const removeFile = (file: File) => {
        dispatch(removeUploadedFile(file));
    };

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
        name: Yup.string().required(t('Required field')),
        description: Yup.string().required(t('Required field')),
        price: Yup.number().required(t('Required field')),
        quantity: Yup.number().required(t('Required field'))
    });

    return (
        <Formik
            enableReinitialize
            initialValues={productData}
            validationSchema={SubmitSchema}
            onSubmit={(values) => {
                const formData = new FormData();
                Object.keys(values).forEach((key: string) => {
                    formData.append(key, (values as any)[key]);
                });
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
                                {uploadedFiles.length > 0 && (
                                    <aside>
                                        <h4>Uploaded Files</h4>
                                        {/*<ul>{files}</ul>*/}
                                        <ul>
                                            {uploadedFiles.map((_file: File) => (
                                                <li key={_file.lastModified}>
                                                    <i className="file" />
                                                    <img
                                                        src={URL.createObjectURL(_file)}
                                                        alt=""
                                                        width="85"
                                                        height="85"
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
                                label={'Product Price'}
                                name={'price'}
                                placeholder={'Product Price'}
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

                            <InputText
                                icon={null}
                                label={'Product Keyword'}
                                name={'keyword'}
                                placeholder={'Product Keyword'}
                                style={null}
                                props={props}
                            />

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

                            <InputText
                                icon={null}
                                label={'Quantity'}
                                name={'quantity'}
                                placeholder={'Quantity'}
                                style={null}
                                props={props}
                            />

                            <InputSwitcher
                                label={'Publish'}
                                name={'publish'}
                                style={null}
                                props={props}
                            />

                            <button type="submit" className="gradient-btn">
                                {t('Add Product')}
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    );
}

export default ProductForm;
