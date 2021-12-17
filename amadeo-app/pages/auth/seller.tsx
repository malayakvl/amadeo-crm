import React, { useState } from 'react';
import * as Yup from 'yup';
import { providers, getSession, signIn } from 'next-auth/client';
import { useTranslations } from 'next-intl';
import FullLayout from '../../components/layout/FullLayout';
import Image from 'next/image';
import InputTextDisabled from '../../components/_form/InputTextDisabled';
import { Formik } from 'formik';
import { InputText } from '../../components/_form/InputText';
import { TogglePassword } from '../../components/_form';

function Seller() {
    const t = useTranslations();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email(t('Must be a valid email'))
            .required(t('You must enter your email')),
        last_name: Yup.string().required(t('You must enter your family name')),
        first_name: Yup.string().required(t('You must enter your first name')),
        identification_number: Yup.string().required(t('You must enter your tax-ID')),
        full_address: Yup.string().required(t('You must enter your address')),
        phone: Yup.string().required(t('You must enter your phone number')),
        terms: Yup.boolean().oneOf([true], t('Confirm terms')),
        password: Yup.string()
            .required(t('Required field'))
            .min(3, t('Password must be at least 6 characters')),
        password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            t('Passwords must match')
        )
    });

    const onSubmit = (values: any) => {
        console.log(values)
    };

    return (
        <div className="flex justify-center">
            <div className="px-24 py-14 my-10 rounded-lg border shadow-xl flex justify-center w-[996px] bg-white">
                <div className="pt-5 pr-20 border-r">
                    <div className="flex mb-4 items-center">
                        <div className="mr-2.5 font-bold text-3xl line-height-105percent w-60">Your email has been verified!</div>
                        <Image
                            src="/images/tick.svg"
                            width="52"
                            height="40"
                            layout="fixed"
                        />
                    </div>

                    <InputTextDisabled icon="f-email" value="email@email.com" />

                    <div className="mb-3 mt-9 text-blue-350 text-sm">Almost there, please</div>
                    <div className="w-60 text-5xl line-height-105percent font-bold">
                        Complete your profile
                    </div>
                </div>
                <div className="ml-8 w-full">
                    <Formik
                        enableReinitialize
                        initialValues={{}}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}>
                        {(props) => (
                            <form>
                                <InputText
                                    icon={'f-fname'}
                                    style={null}
                                    label={null}
                                    name={'name'}
                                    placeholder={'Name'}
                                    props={props}
                                />
                                <InputText
                                    icon={'f-lname'}
                                    style={null}
                                    label={null}
                                    name={'last_name'}
                                    placeholder={'Family Name'}
                                    props={props}
                                />
                                <InputText
                                    icon={'f-company'}
                                    style={null}
                                    label={null}
                                    name={'company'}
                                    placeholder={'Company'}
                                    props={props}
                                />
                                <InputText
                                    icon={'f-company-id'}
                                    style={'w-1/2'}
                                    label={null}
                                    name={'company_id'}
                                    placeholder={'Company ID'}
                                    props={props}
                                />
                                <InputText
                                    icon={'f-vat'}
                                    style={'w-1/2'}
                                    label={null}
                                    name={'vat'}
                                    placeholder={'VAT'}
                                    props={props}
                                />
                                <InputText
                                    icon={'f-location'}
                                    style={null}
                                    label={null}
                                    name={'address'}
                                    placeholder={'Full Address'}
                                    props={props}
                                />
                                <InputText
                                    icon={'f-phone'}
                                    style={null}
                                    label={null}
                                    name={'phone'}
                                    placeholder={'Phone Number'}
                                    props={props}
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
                                    name={'confirm_parssword'}
                                    placeholder={'Confirm password'}
                                    props={props}
                                />
                                <div className="border-t pt-9">
                                    <button type="submit" className="uppercase pt-9 gradient-btn w-full">
                                        continue
                                    </button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>


    );
}
Seller.Layout = FullLayout;

export default Seller;

export async function getServerSideProps(context: any) {
    const { req, locale } = context;
    const session = await getSession({ req });

    if (session) {
        return {
            redirect: { destination: `/${locale === 'fr' ? '' : locale}` }
        };
    }

    return {
        props: {
            providers: await providers(),
            locale: locale,
            messages: {
                ...require(`../../messages/${locale}.json`)
            }
        }
    };
}
