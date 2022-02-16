import Image from 'next/image';
import InputTextDisabled from '../../components/_form/InputTextDisabled';
import { Formik } from 'formik';
import { InputText } from '../_form';
import { TogglePassword } from '../_form';
import * as Yup from 'yup';
import { useTranslations } from 'next-intl';
import getConfig from 'next/config';
import { signIn } from 'next-auth/client';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/auth`;

export default function SellerRegistration({ email }: { email: any }) {
    const t = useTranslations();

    const validationSchema = Yup.object().shape({
        first_name: Yup.string()
            .required(t('You must enter your first name'))
            .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
        last_name: Yup.string()
            .required(t('You must enter your family name'))
            .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field '),
        full_address: Yup.string().required(t('You must enter your address')),
        phone: Yup.string().required(t('You must enter your phone number')),
        password: Yup.string()
            .strict(true)
            .trim('Password cannot include leading and trailing spaces')
            .required(t('Required field'))
            .min(6, t('Password must be at least 6 characters')),
        password_confirmation: Yup.string()
            .required(t('Required field'))
            .oneOf([Yup.ref('password'), null], t('Passwords must match'))
    });

    const onSubmit = (values: any) => {
        fetch(`${baseUrl}/register`, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: { 'Content-Type': 'application/json' }
        }).then((r) => {
            r.json().then(() => {
                signIn('credentials_login', {
                    email: values.email,
                    password: values.password,
                    callbackUrl: `${window.location.origin}/pricing`
                });
            });
        });
    };

    return (
        <Formik
            enableReinitialize
            validationSchema={validationSchema}
            initialValues={{ email }}
            onSubmit={onSubmit}>
            {(props) => (
                <form onSubmit={props.handleSubmit}>
                    <div className="px-24 py-14 my-10 rounded-lg border shadow-xl flex justify-center w-[996px] bg-white">
                        <div className="pt-5 pr-20 border-r">
                            <div className="flex mb-4 items-center">
                                <div className="mr-2.5 font-bold text-3xl line-height-105percent w-60">
                                    {t('Your email has been verified!')}
                                </div>
                                <Image
                                    src="/images/tick.svg"
                                    width="52"
                                    height="40"
                                    layout="fixed"
                                />
                            </div>

                            <InputTextDisabled name="email" icon="f-email" props={props} />

                            <div className="mb-3 mt-9 text-blue-350 text-sm">
                                {t('Almost there, please')}
                            </div>
                            <div className="w-60 text-5xl line-height-105percent font-bold">
                                {t('Complete your profile')}
                            </div>
                        </div>
                        <div className="ml-8 w-full">
                            <InputText
                                icon={'f-fname'}
                                style={null}
                                label={null}
                                name={'first_name'}
                                placeholder={'Name'}
                                props={props}
                                tips={null}
                            />
                            <InputText
                                icon={'f-lname'}
                                style={null}
                                label={null}
                                name={'last_name'}
                                placeholder={'Family Name'}
                                props={props}
                                tips={null}
                            />
                            <InputText
                                icon={'f-company'}
                                style={null}
                                label={null}
                                name={'company_name'}
                                placeholder={'Company'}
                                props={props}
                                tips={null}
                            />
                            <InputText
                                icon={'f-company-id'}
                                style={'w-1/2'}
                                label={null}
                                name={'company_id'}
                                placeholder={'Company ID'}
                                props={props}
                                tips={null}
                            />
                            <InputText
                                icon={'f-vat'}
                                style={'w-1/2'}
                                label={null}
                                name={'vat'}
                                placeholder={'VAT'}
                                props={props}
                                tips={null}
                            />
                            <InputText
                                icon={'f-location'}
                                style={null}
                                label={null}
                                name={'full_address'}
                                placeholder={'Full Address'}
                                props={props}
                                tips={null}
                            />
                            <InputText
                                icon={'f-phone'}
                                style={null}
                                label={null}
                                name={'phone'}
                                placeholder={'Phone Number'}
                                props={props}
                                tips={null}
                            />
                            <TogglePassword
                                icon={'f-key'}
                                style={null}
                                label={null}
                                name={'password'}
                                placeholder={'Password'}
                                props={props}
                            />
                            <TogglePassword
                                icon={'f-key'}
                                style={'mb-9'}
                                label={null}
                                name={'password_confirmation'}
                                placeholder={'Confirm password'}
                                props={props}
                            />
                            <div className="border-t pt-9">
                                <button
                                    type="submit"
                                    className="uppercase pt-9 gradient-btn w-full">
                                    {t('Continue')}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    );
}
