import Head from 'next/head';
import { getSession } from 'next-auth/client';
// import React, { useEffect, Fragment, useCallback, useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
// import { CheckIcon, BanIcon } from '@heroicons/react/solid';
// import { showLoaderAction } from '../../redux/layouts/actions';
// import { fetchFormAction } from '../../redux/paymentPlans';
// import { useDispatch, useSelector } from 'react-redux';
// import { itemsSelector } from '../../redux/paymentPlans/selectors';
// import { parseTranslation } from '../../lib/functions';
// import { submitFormAction } from '../../redux/paymentPlans/actions';
// import ConfirmDialog from '../../components/_common/ConfirmDialog';
import { ShippingAddress, ShippingMethod, PaymentMethod } from '../../components/checkout';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CardValidator from 'card-validator';

export default function Index({ session, locale }: { session: any; locale: any }) {
    if (!session) return <></>;
    const t = useTranslations();
    // const dispatch = useDispatch();
    // const plans = useSelector(itemsSelector);

    // const [selectedItem, setSelectedItem] = useState<any | null>();

    // useEffect(() => {
    //     dispatch(showLoaderAction(true));
    //     dispatch(fetchFormAction());
    // }, []);

    // useEffect(() => {
    //     dispatch(showLoaderAction(false));
    // }, [plans?.header?.length]);

    // const handlerConfirm = useCallback(() => {
    //     if (!selectedItem) return;

    //     dispatch(
    //         submitFormAction({ optionId: selectedItem.optionId, planId: selectedItem.planId })
    //     );
    //     setSelectedItem(null);
    // }, [dispatch, selectedItem]);

    const validationSchema = Yup.object({
        first_name: Yup.string()
            .strict(true)
            .trim(t('Cannot include leading and trailing spaces'))
            .required(t('You must enter your first name'))
            .matches(/^[aA-zZ\s]+$/, t('Only alphabets are allowed for this field')),
        last_name: Yup.string()
            .strict(true)
            .trim(t('Cannot include leading and trailing spaces'))
            .required(t('You must enter your family name'))
            .matches(/^[aA-zZ\s]+$/, t('Only alphabets are allowed for this field')),
        country_id: Yup.number().required(t('You must select country')),
        post_code: Yup.string()
            .strict(true)
            .trim(t('Cannot include leading and trailing spaces'))
            .required(t('Required field')),
        state: Yup.string()
            .strict(true)
            .trim(t('Cannot include leading and trailing spaces'))
            .required(t('Required field'))
            .min(3, t('State must be at least 3 characters')),
        city: Yup.string()
            .strict(true)
            .trim(t('Cannot include leading and trailing spaces'))
            .required(t('Required field'))
            .min(3, t('City must be at least 3 characters')),
        address_line_1: Yup.string()
            .strict(true)
            .trim(t('Cannot include leading and trailing spaces'))
            .required(t('Required field'))
            .min(5, t('Address must be at least 5 characters')),
        address_line_2: Yup.string()
            .strict(true)
            .trim(t('Cannot include leading and trailing spaces')),
        phone: Yup.string()
            .strict(true)
            .trim(t('Cannot include leading and trailing spaces'))
            .required(t('You must enter your phone number'))
            .min(5, t('Phone must be at least 5 characters')),

        card_number: Yup.string()
            .strict(true)
            .when('paymentMethod', {
                is: (val: string) => val === 'card',
                then: Yup.string()
                    .test(
                        'test-card-number',
                        t('Credit card number is invalid'),
                        (value) => CardValidator.number(value).isValid
                    ) // return true false based on validation
                    .required(t('Required field'))
                // otherwise: Yup.required(),
            }),
        card_expire_date: Yup.string()
            .strict(true)
            .when('paymentMethod', {
                is: (val: string) => val === 'card',
                then: Yup.string()
                    .test(
                        'test-card-exp',
                        t('Credit card expiration date is invalid'),
                        (value) => CardValidator.expirationDate(value).isValid
                    )
                    .required(t('Required field'))
            }),
        card_ccv: Yup.string()
            .strict(true)
            .when('paymentMethod', {
                is: (val: string) => val === 'card',
                then: Yup.string()
                    .test(
                        'test-card-ccv',
                        t('Credit card CCV is invalid'),
                        (value) => CardValidator.cvv(value).isValid
                    )
                    .required(t('Required field'))
            })
    });

    return (
        <>
            <Head>
                <title>Amadeo CRM - Checkout</title>
                <meta name="description" content="Generated by create next app" />
            </Head>

            <div className="lg:white-shadow-medium bg-white rounded-lg pr-4 pb-4 lg:pr-8 lg:pb-8 lg:mr-4 mt-10">
                <div className="flex flex-wrap items-center">
                    <div className="text-3xl font-bold text-gray-350 p-4 lg:p-8 mr-4 lg:mr-8">
                        {t('Let’s check you out!')}
                    </div>

                    <div className="flex-auto p-4 lg:p-8">
                        <ol className="list-reset flex items-center text-gray-300 font-bold">
                            <li className="self-center flex-none mr-1 sd:mr-2 sd:pr-4 min-w-max h-1 background-gradient">
                                <div className="w-8 h-8 -mt-4 mr-2 sd:mr-4 rounded-full background-gradient shadow-2xl"></div>
                            </li>
                            <li className="bg-clip-text text-transparent background-gradient">
                                {t('Review your order')}
                            </li>

                            <li className="self-center flex-1 mx-2 sd:px-4 min-w-max h-1 bg-gray-300">
                                <div className="w-8 h-8 -mt-4 ml-auto mr-2 sd:mr-4 rounded-full bg-gray-300"></div>
                            </li>
                            <li>{t('Payment')}</li>

                            <li className="self-center flex-1 mx-2 sd:px-4 min-w-max h-1 bg-gray-300 hidden sm:block">
                                <div className="w-8 h-8 -mt-4 ml-auto mr-2 sd:mr-4 rounded-full bg-gray-300"></div>
                            </li>
                            <li className="hidden sm:block">{t('Order complete!')}</li>
                        </ol>
                    </div>
                </div>
                <Formik
                    initialValues={{
                        isEqualAddresses: true,
                        shippingMethod: 'dhl',
                        paymentMethod: 'paypal'
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            actions.setSubmitting(false);
                        }, 500);
                    }}>
                    <Form>
                        <div className="flex flex-wrap justify-between">
                            <div className="flex-auto">
                                <div className="white-shadow-medium bg-white rounded-lg p-3 lg:p-6 ml-4 lg:ml-8 mt-8">
                                    <div className="text-2xl font-bold text-gray-350 mb-6">
                                        {t('Shipping Address')}
                                    </div>
                                    <ShippingAddress locale={locale} />
                                </div>

                                <div className="white-shadow-medium bg-white rounded-lg p-3 lg:p-6 ml-4 lg:ml-8 mt-10">
                                    <div className="text-2xl font-bold text-gray-350 mb-6">
                                        {t('Shipping  Method')}
                                    </div>
                                    <ShippingMethod />
                                </div>

                                <div className="white-shadow-medium bg-white rounded-lg p-3 lg:p-6 ml-4 lg:ml-8 mt-10">
                                    <div className="text-2xl font-bold text-gray-350 mb-6">
                                        {t('Payment  Method')}
                                    </div>
                                    <PaymentMethod />
                                </div>
                            </div>

                            <div className="flex-auto white-shadow-medium bg-white rounded-lg p-3 lg:p-6 ml-4 lg:ml-8 mt-10 shadow-inner">
                                <div className="text-2xl font-bold text-gray-350 mb-6">
                                    {t('Order summary')}
                                </div>

                                <button
                                    type="submit"
                                    className="uppercase pt-9 gradient-btn w-full">
                                    {t('Pay 999,999.99 €')}
                                </button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    );
}
export async function getServerSideProps(context: any) {
    const { locale } = context;
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: { destination: `/${locale === 'fr' ? '' : `${locale}/`}auth/signin` }
        };
    }

    return {
        props: {
            session,
            locale,
            messages: {
                ...require(`../../messages/${locale}.json`)
            }
        }
    };
}
