import * as Yup from 'yup';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { Formik } from 'formik';
import { InputSwitcher, InputText } from '../_form';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import ReactTags from 'react-tag-autocomplete';
import Select, { StylesConfig } from 'react-select';
import chroma from 'chroma-js';
import { removeUploadedFile } from '../../redux/products';
import {
    productAdditionalSelector,
    selectedAdditionalsSelector,
    tagSuggestionsSelector,
    uploadedFilesSelector
} from '../../redux/products/selectors';
import { prepareAdditionalDropdown, prepareAdditionalColorDropdown } from '../../lib/functions';
import {
    addUploadedFile,
    findTagAction,
    removeProductFileAction,
    updateProductAction
} from '../../redux/products/actions';
import { baseApiUrl } from '../../constants';
import dynamic from 'next/dynamic';
import 'suneditor/dist/css/suneditor.min.css';

const SunEditor = dynamic(() => import('suneditor-react'), {
    ssr: false
});

export interface ColourOption {
    readonly value: string;
    readonly label: string;
    readonly color: string;
    readonly isFixed?: boolean;
    readonly isDisabled?: boolean;
}

const colourStyles: StylesConfig<ColourOption, true> = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        const color = chroma(data.color);
        return {
            ...styles,
            backgroundColor: isDisabled
                ? undefined
                : isSelected
                ? data.color
                : isFocused
                ? color.alpha(0.1).css()
                : undefined,
            color: isDisabled
                ? '#ccc'
                : isSelected
                ? chroma.contrast(color, 'white') > 2
                    ? 'white'
                    : 'black'
                : data.color,
            cursor: isDisabled ? 'not-allowed' : 'default',

            ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled
                    ? isSelected
                        ? data.color
                        : color.alpha(0.3).css()
                    : undefined
            }
        };
    },
    multiValue: (styles, { data }) => {
        const color = chroma(data.color);
        return {
            ...styles,
            backgroundColor: color.alpha(0.1).css()
        };
    },
    multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: data.color
    }),
    multiValueRemove: (styles, { data }) => ({
        ...styles,
        color: data.color,
        ':hover': {
            backgroundColor: data.color,
            color: 'white'
        }
    })
};

const RenderPropsTable: React.FC<any> = ({ colors, sizes, props, additional }) => {
    const t = useTranslations();
    console.log(additional.colors);

    const _colors: any[] = [];
    const _sizes: any[] = [];
    let tmpColors = [];
    if (colors.length === undefined) {
        tmpColors.push(colors);
    } else {
        tmpColors = colors;
    }
    tmpColors.forEach((_color: any) => {
        _colors.push(_color.label);
    });
    let tmpSizes = [];
    if (sizes.length === undefined) {
        tmpSizes.push(sizes);
    } else {
        tmpSizes = sizes;
    }
    tmpSizes.forEach((_size: any) => {
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
                    {/*<thead>*/}
                    {/*    <tr>*/}
                    {/*        <th>*/}
                    {/*            <button className="action-dublicate action">*/}
                    {/*                <span>Dublicate</span>*/}
                    {/*            </button>*/}
                    {/*        </th>*/}
                    {/*        <th className="whitespace-nowrap uppercase" />*/}
                    {/*        <th className="whitespace-nowrap uppercase">Price</th>*/}
                    {/*        <th className="whitespace-nowrap uppercase">Quantity</th>*/}
                    {/*        <th className="whitespace-nowrap uppercase">SKU</th>*/}
                    {/*    </tr>*/}
                    {/*</thead>*/}
                    <tbody>
                        {attrs.map((attr: any, index) => (
                            <tr key={index}>
                                <td style={{ verticalAlign: 'middle' }}>
                                    <input type="checkbox" />
                                </td>
                                <td
                                    className="whitespace-nowrap"
                                    style={{ verticalAlign: 'middle' }}>
                                    {attr.size !== 'none' ? attr.size : ''}
                                    {attr.color !== 'none' && attr.size !== 'none' ? ' / ' : ''}
                                    <span
                                        style={{
                                            color: attr.color
                                                ? additional.colors.find(
                                                      (color: any) => color.name === attr.color
                                                  ).code
                                                : ''
                                        }}>
                                        {attr.color !== 'none' ? attr.color : ''}
                                    </span>{' '}
                                </td>
                                <td>
                                    <InputText
                                        icon={null}
                                        label={t('Price')}
                                        name={`configurePrice_${attr.color}_${attr.size}`}
                                        placeholder={'Price'}
                                        style={'w-[100px]'}
                                        props={props}
                                        tips={null}
                                    />
                                </td>
                                <td>
                                    <InputText
                                        icon={null}
                                        label={t('Quantity')}
                                        name={`configureQty_${attr.color}_${attr.size}`}
                                        placeholder={'Quantity'}
                                        style={'w-[100px]'}
                                        props={props}
                                        tips={null}
                                    />
                                </td>
                                <td>
                                    <InputText
                                        icon={null}
                                        label={t('SKU')}
                                        name={`configureSKU_${attr.color}_${attr.size}`}
                                        placeholder={'SKU'}
                                        style={'w-[170px]'}
                                        props={props}
                                        tips={null}
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
    // const reactTags = useRef<ReactTags>();
    const reactTags = React.createRef<ReactTags>();

    const additionalProps = useSelector(productAdditionalSelector);
    const additionalSelectedProps = useSelector(selectedAdditionalsSelector);
    const searchTagSuggestions = useSelector(tagSuggestionsSelector);

    const uploadedFiles = useSelector(uploadedFilesSelector);
    const [productPhotos, setProductPhotos] = useState(photos);
    const [editorContent, setEditorContent] = useState(productData.product.description);

    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedMaterials, setSelectedMaterials] = useState(null);
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const [tags, setTags] = useState<any[]>([]);
    const [suggestions, setSuggestions] = useState([]);
    // const [isBusy, setIsBusy] = useState(false);

    const onDelete = useCallback(
        (tagIndex: number) => {
            setTags(tags.filter((_, i) => i !== tagIndex));
        },
        [tags]
    );

    const onAddition = useCallback(
        (newTag) => {
            setTags([...tags, newTag]);
        },
        [tags]
    );

    const onInput = (query: string) => {
        dispatch(findTagAction(query));
    };
    useEffect(() => {
        setSuggestions(searchTagSuggestions);
        // setIsBusy(false);
    }, [searchTagSuggestions]);

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
        setSelectedSizes(additionalSelectedProps.sizes);
        setSelectedColors(additionalSelectedProps.colors);
        setSelectedMaterials(additionalSelectedProps.materials);
    }, [additionalSelectedProps]);

    useEffect(() => {
        acceptedFiles.forEach((file: File) => {
            dispatch(addUploadedFile(file));
        });
    }, [acceptedFiles]);

    const removeProductFile = (file: string) => {
        let _photos = productPhotos;
        _photos = _photos.filter((_file: string) => _file !== file);
        dispatch(removeProductFileAction(file, productData.product.id));
        setProductPhotos(_photos);
    };
    useEffect(() => {
        setProductPhotos(photos);
    }, [photos]);

    const handleChangeEditor = (content: any) => {
        setEditorContent(content);
    };
    const handleChangeMaterials = (selectedOption: any) => {
        setSelectedMaterials(selectedOption);
    };
    const handleChangeColor = (selectedOption: any) => {
        setSelectedColors(selectedOption);
    };
    const handleChangeSize = (selectedOption: any) => {
        setSelectedSizes(selectedOption);
    };

    const SubmitSchema = Yup.object().shape({
        name: Yup.string().required(t('Required field')),
        description: Yup.string().required(t('Required field'))
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
                dispatch(updateProductAction(formData, values.id));
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
                                            {productPhotos.map((_file: string, _index) => (
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
                                                            removeProductFile(_file);
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
                            <h2 className="form-subtitle">{t('Product details')}</h2>
                            <InputText
                                icon={null}
                                label={'Product Name'}
                                name={'name'}
                                placeholder={'Product Name'}
                                style={null}
                                props={props}
                                tips={t('0/140 Characters')}
                            />

                            <div className="mb-4">
                                <label className="control-label" htmlFor={'description'}>
                                    {t('Product Description')}
                                </label>
                                <SunEditor
                                    name={'description'}
                                    setDefaultStyle="font-family: Montserrat; font-size: 14px;"
                                    placeholder={t('Product Description')}
                                    defaultValue={props.values.description}
                                    setContents={props.values.description}
                                    setOptions={{ height: '250' }}
                                    onChange={handleChangeEditor}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="control-label">{t('Hashtag')}</label>
                                <ReactTags
                                    ref={reactTags}
                                    tags={tags}
                                    allowNew={true}
                                    suggestions={suggestions}
                                    onDelete={onDelete}
                                    onAddition={onAddition}
                                    onInput={onInput}
                                />
                            </div>

                            {!props.values.configured && (
                                <>
                                    <InputText
                                        icon={null}
                                        label={'SKU'}
                                        name={'sku'}
                                        placeholder={'SKU'}
                                        style={null}
                                        props={props}
                                        tips={t('0/140 Characters')}
                                    />

                                    <InputText
                                        icon={null}
                                        label={'Product Price'}
                                        name={'price'}
                                        placeholder={'Product Price'}
                                        style={null}
                                        props={props}
                                        tips={null}
                                    />

                                    <InputText
                                        icon={null}
                                        label={'Quantity'}
                                        name={'quantity'}
                                        placeholder={'Quantity'}
                                        style={null}
                                        props={props}
                                        tips={null}
                                    />
                                </>
                            )}

                            <div className="mb-4">
                                <label className="control-label">{t('Material')}</label>
                                <div className="relative">
                                    <em className="input-tips">{t('Select one')}</em>
                                    <Select
                                        className={'form-control-dropdown'}
                                        classNamePrefix={'inventory'}
                                        options={prepareAdditionalDropdown(
                                            additionalProps.materials,
                                            locale
                                        )}
                                        value={selectedMaterials}
                                        onChange={handleChangeMaterials}
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="control-label">{t('Color')}</label>
                                <div className="relative">
                                    <em className="input-tips">{t('Select one')}</em>
                                    <Select
                                        isMulti={props.values.configured}
                                        className={'form-control-dropdown'}
                                        classNamePrefix={'inventory-color'}
                                        options={prepareAdditionalColorDropdown(
                                            additionalProps.colors,
                                            locale
                                        )}
                                        value={selectedColors}
                                        styles={colourStyles}
                                        onChange={handleChangeColor}
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="control-label">{t('Size')}</label>
                                <div className="relative">
                                    <em className="input-tips">{t('Select one')}</em>
                                    <Select
                                        isMulti={props.values.configured}
                                        className={'form-control-dropdown'}
                                        classNamePrefix={'inventory'}
                                        options={prepareAdditionalDropdown(
                                            additionalProps.sizes,
                                            locale
                                        )}
                                        value={selectedSizes}
                                        onChange={handleChangeSize}
                                    />
                                </div>
                            </div>

                            <InputSwitcher
                                label={'Configured'}
                                name={'configured'}
                                style={null}
                                props={props}
                                onChange={props.handleChange}
                            />
                            {props.values.configured && (
                                <>
                                    <RenderPropsTable
                                        colors={selectedColors}
                                        sizes={selectedSizes}
                                        props={props}
                                        additional={additionalProps}
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
