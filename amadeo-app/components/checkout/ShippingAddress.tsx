import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { useFormikContext, Field } from 'formik';
import { useTranslations } from 'next-intl';
import { countriesSelector } from '../../redux/countries/selectors';
import { fetchCountriesAction } from '../../redux/countries/actions';
import { prepareCountriesDropdown } from '../../lib/functions';
import { InputText } from '../_form';

const ShippingAddress = ({ locale }: { locale: string }) => {
    const t = useTranslations();
    const dispatch = useDispatch();

    const props = useFormikContext() as any;

    const countries = useSelector(countriesSelector);

    const preparedCountriesDropdown = useMemo(
        () => prepareCountriesDropdown(countries, locale),
        [countries]
    );

    useEffect(() => {
        dispatch(fetchCountriesAction());
    }, []);

    return (
        <div className="grid grid-cols-2 gap-2 lg:gap-4">
            <InputText
                icon={'f-fname'}
                style={null}
                label={null}
                name={'first_name'}
                placeholder={t('Name')}
                props={props}
                tips={null}
            />
            <InputText
                icon={'f-lname'}
                style={null}
                label={null}
                name={'last_name'}
                placeholder={t('Sername')}
                props={props}
                tips={null}
            />

            <InputText
                icon={'f-phone'}
                style={'col-span-2'}
                label={null}
                name={'phone'}
                placeholder={t('Phone Number')}
                props={props}
                tips={null}
                onChange={(event) => {
                    event.target.value = event.target.value.replace(/[^\s\d+()-]+/gm, '');
                    props.handleChange(event);
                }}
            />

            <div className="">
                <Select
                    className={'form-control-dropdown mb-2'}
                    classNamePrefix={'inventory'}
                    placeholder={t('Country')}
                    name="country_id"
                    options={preparedCountriesDropdown}
                    value={preparedCountriesDropdown?.find(
                        (option: any) => option.value === props.values.country_id
                    )}
                    onChange={(selectedOption) =>
                        props.setFieldValue('country_id', selectedOption.value)
                    }
                />
                {props.errors.country_id && (
                    <div className="error-el">{props.errors.country_id}</div>
                )}
            </div>

            <InputText
                name={'state'}
                label={null}
                icon={'f-location'}
                placeholder={t('State')}
                style={null}
                props={props}
                tips={null}
            />

            <InputText
                label={null}
                icon={'f-location'}
                name={'city'}
                placeholder={t('City')}
                style={null}
                props={props}
                tips={null}
            />

            <InputText
                label={null}
                icon={'f-location'}
                name={'post_code'}
                placeholder={t('Post Code')}
                style={null}
                props={props}
                tips={null}
            />

            <InputText
                label={null}
                icon={'f-location'}
                name={'address_line_1'}
                placeholder={t('Address Line 1')}
                style={'col-span-2'}
                props={props}
                tips={null}
            />

            <InputText
                label={null}
                icon={'f-location'}
                name={'address_line_2'}
                placeholder={t('Address Line 2')}
                style={'col-span-2'}
                props={props}
                tips={null}
            />

            <div className="col-span-2">
                <Field
                    type="checkbox"
                    name="isEqualAddresses"
                    id="isEqualAddress"
                    className="focus:ring-indigo-500 h-5 w-5 text-indigo-600 border-gray-300 rounded"
                />
                <label
                    htmlFor="isEqualAddresses"
                    className="ml-3 text-sm font-medium text-gray-700">
                    My shipping and billing address are the same
                </label>
            </div>
        </div>
    );
};

export default ShippingAddress;
