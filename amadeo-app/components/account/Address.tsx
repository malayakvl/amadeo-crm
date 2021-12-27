import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslations } from 'next-intl';
import { addressSelector } from '../../redux/address/selectors';
import { InputText, InputSelect, InputSelectLocalize } from '../_form';
import { addAddressAction, fetchAddressAction, setAddressAction } from '../../redux/address';
import { useEffect } from 'react';
import { userSelector } from '../../redux/user/selectors';

interface CountryProps {
    id: number;
    code: string;
    name: string;
    translations: any;
}

function Address({
    locale
}: {
    locale: string;
}) {
    const t = useTranslations();
    const addressData = useSelector(addressSelector);
    const user = useSelector(userSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user.email) {
            dispatch(fetchAddressAction());
        }
    }, [user?.email]);

    const SubmitSchema = Yup.object().shape({
        // country_id: Yup.string().required(t('Required field')),
        post_code: Yup.string().required(t('Required field')),
        address_type: Yup.string().required(t('Required field')),
        city: Yup.string().required(t('Required field')),
        address_line_1: Yup.string().required(t('Required field'))
    });

    const addressTypeData = [
        { id: 'home address', name: t('home address') },
        { id: 'email adderss', name: t('email adderss') }
    ];

    return (
        <Formik
            enableReinitialize
            initialValues={addressData}
            validationSchema={SubmitSchema}
            onSubmit={(values) => {
                console.log('test')
                dispatch(addAddressAction(values));
            }}>
            {(props) => (
                <form onSubmit={props.handleSubmit} className="mt-5">
                    <InputSelectLocalize
                        locale={locale}
                        name={'country_id'}
                        fieldName={'nicename'}
                        label={null}
                        options={countriesData}
                        style={'lg:w-1/4'}
                        props={props}
                    />

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

                    <InputSelect
                        name={'address_type'}
                        label={null}
                        options={addressTypeData}
                        style={'lg:w-1/4'}
                        props={props}
                    />

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
                    <button
                        type="button"
                        className="ml-3 cancel">
                        {t('Cancel')}
                    </button>
                </form>
            )}
        </Formik>
    );
}

export default Address;
