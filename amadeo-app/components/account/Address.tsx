import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslations } from 'next-intl';
import { addressSelector } from '../../redux/address/selectors';
import { InputText } from '../_form';
import { addAddressAction, fetchAddressAction } from '../../redux/address'
import { prepareCountriesDropdown } from '../../lib/functions';
import { useEffect, useState } from 'react';
import { userSelector } from '../../redux/user/selectors';
import { getCountries } from '../../lib/staff';
import Select from 'react-select';

function Address({ locale }: { locale: string }) {
    const t = useTranslations();
    const address = useSelector(addressSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        getCountries().then((countries) => {
            const preparedCountriesDropdown = prepareCountriesDropdown(countries, locale);

            preparedCountriesDropdown.forEach((item: any) => {
                if (item.value === address.country_id) {
                    setSelectedCountry(item);
                }
            });

            setCountries(preparedCountriesDropdown);
        });

        addressTypeData.forEach((item: any) => {
            if (item.value === address.address_type) {
                setSelectedAddressType(item);
            }
        });


    }, [address])

    useEffect(() => {
        dispatch(fetchAddressAction());

    }, []);

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({ label: 'Afghanistan', value: 1 });
    const [selectedAddressType, setSelectedAddressType] = useState({ value: 'home address', label: t('home address') })

    function onChangeCountry(value: any) {
        setSelectedCountry(value);

    }

    function onChangeAddressType(value: any) {
        setSelectedAddressType(value);

    }

    const SubmitSchema = Yup.object().shape({
        // country_id: Yup.string().required(t('Required field')),
        post_code: Yup.string().required(t('Required field')),
        address_type: Yup.string().required(t('Required field')),
        city: Yup.string().required(t('Required field')),
        address_line_1: Yup.string().required(t('Required field'))
    });

    const addressTypeData = [
        { value: 'home address', label: t('home address') },
        { value: 'email adderss', label: t('email adderss') }
    ];

    return (
        <Formik
            enableReinitialize
            initialValues={address}
            validationSchema={SubmitSchema}
            onSubmit={(values) => {
                values.country_id = selectedCountry.value
                values.address_type = selectedAddressType.value
                dispatch(addAddressAction(values));
            }}>
            {(props) => (
                <form onSubmit={props.handleSubmit} className="mt-5">
                    <div className="mb-4 lg:w-1/4">
                        <Select
                            className={'form-control-dropdown'}
                            classNamePrefix={'inventory'}
                            onChange={onChangeCountry}
                            placeholder={t('Country')}
                            name="country_id"
                            value={selectedCountry}
                            options={countries}
                        />
                    </div>

                    <InputText
                        name={'state'}
                        label={null}
                        icon={'f-location'}
                        placeholder={'State'}
                        style={'lg:w-1/4'}
                        props={props}
                        tips={null}
                    />

                    <InputText
                        label={null}
                        icon={'f-location'}
                        name={'post_code'}
                        placeholder={'Post Code'}
                        style={'lg:w-1/4'}
                        props={props}
                        tips={null}
                    />

                    <div className="mb-4 lg:w-1/4">
                        <Select
                            className={'form-control-dropdown'}
                            classNamePrefix={'inventory'}
                            placeholder={t('Country')}
                            name="country_id"
                            options={addressTypeData}
                            onChange={onChangeAddressType}
                            value={selectedAddressType}
                        />
                    </div>

                    <InputText
                        label={null}
                        icon={'f-location'}
                        name={'city'}
                        placeholder={'City'}
                        style={'lg:w-1/4'}
                        props={props}
                        tips={null}
                    />

                    <InputText
                        label={null}
                        icon={'f-location'}
                        name={'address_line_1'}
                        placeholder={'Address Line 1'}
                        style={'lg:w-1/4'}
                        props={props}
                        tips={null}
                    />

                    <InputText
                        label={null}
                        icon={'f-location'}
                        name={'address_line_2'}
                        placeholder={'Address Line 2'}
                        style={'lg:w-1/4'}
                        props={props}
                        tips={null}
                    />
                    <div className="mt-10 mb-7 block border border-gray-180 border-b-0" />
                    <button type="submit" className="gradient-btn">
                        {t('Save')}
                    </button>
                </form>
            )}
        </Formik>
    );
}

export default Address;
