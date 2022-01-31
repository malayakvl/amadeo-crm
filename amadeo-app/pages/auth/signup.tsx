import FullLayout from '../../components/layout/FullLayout';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { providers, getSession } from 'next-auth/client';
import Link from 'next/link';
import { Field, Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { inviteUserAction } from '../../redux/user/actions';
import Image from 'next/image';
import { accountService } from '../../_services';

export default function Signup() {
    const dispatch = useDispatch();
    type FormData = {
        email: string;
        acceptTerms: boolean;
        role_id: '1' | '2';
    };

    const t = useTranslations();
    const [roleId, setRoleId] = useState(1);
    const [isFbClicked, setIsFbClicked] = useState(false);

    const validationSchema = Yup.object().shape({
        email: !isFbClicked
            ? Yup.string().email(t('Must be a valid email')).required(t('Required field'))
            : Yup.string(),
        acceptTerms: Yup.bool().oneOf([true], t('Accept Terms is required'))
    });

    const onSubmit = (values: FormData, actions: any) => {
        if (isFbClicked) {
            accountService.registerFB(roleId);
        } else {
            dispatch(inviteUserAction(values));
            actions.resetForm();
        }
    };

    return (
        <div className="flex justify-center h-[580px]">
            <Formik
                enableReinitialize
                initialValues={{ email: '', acceptTerms: false, role_id: '1' }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                {(props) => (
                    <form
                        onSubmit={props.handleSubmit}
                        className="rounded-lg border shadow-xl mt-10 flex w-[1000px] bg-white px-20 py-14">
                        <div className="font-bold mt-8 pr-12 w-2/4">
                            <div className="text-5xl line-height-105percent mb-9 w-48">
                                {t('Sing up today!')}
                            </div>

                            <div className="mb-4 text-2xl line-height-105percent w-72">
                                {t('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')}
                            </div>

                            <div className="font-normal mb-10 text-blue-350 w-60">
                                {t('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')}
                            </div>

                            <Link href={'/auth/signin'}>
                                <a className="font-bold text-orange-450">
                                    {t('Already have an account? Sign in here!')}
                                </a>
                            </Link>
                        </div>

                        <div className="pl-12 border-l w-2/4">
                            <div className="flex mb-14">
                                <div className="w-16 leading-10 text-gray-200 font-bold text-5xl">
                                    1.
                                </div>
                                <div>
                                    <div className="font-bold mb-2.5">
                                        {t('How would you like to Sign up as?')} :
                                    </div>
                                    <div className="text-gray-180 text-xs mb-4">
                                        <Field
                                            onClick={() => setRoleId(2)}
                                            id="buyer-radio"
                                            type="radio"
                                            className="radio mr-2.5"
                                            name="role_id"
                                            value="1"
                                        />
                                        <label htmlFor="buyer-radio">{t('Shopper')}</label>
                                    </div>
                                    <div className="text-gray-180 text-xs">
                                        <Field
                                            onClick={() => setRoleId(2)}
                                            id="seller-radio"
                                            type="radio"
                                            className="radio mr-2.5"
                                            name="role_id"
                                            value="2"
                                        />
                                        <label htmlFor="seller-radio">{t('Seller')}</label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="w-16 leading-10 text-gray-200 font-bold text-5xl">
                                    2.
                                </div>
                                <div className="flex flex-col">
                                    <button
                                        onClick={() => {
                                            setIsFbClicked(true);
                                        }}
                                        className="image-btn bg-social-facebook text-white">
                                        <Image
                                            width={24}
                                            height={24}
                                            src="/images/social/facebook-solid.svg"
                                            layout="fixed"
                                            alt=""
                                        />
                                        <div className="text-sm  ml-2.5">
                                            {t('Continue with Facebook')}
                                        </div>
                                    </button>
                                    <div
                                        style={{ lineHeight: '0.1em' }}
                                        className="text-center border-b my-5">
                                        <span className="bg-white px-6">{t('or')}</span>
                                    </div>
                                    <div className="relative">
                                        <i className="f-icon f-email" />

                                        <input
                                            className="form-control-icon"
                                            placeholder={t('Email')}
                                            type="text"
                                            onClick={() => setIsFbClicked(false)}
                                            onChange={props.handleChange}
                                            // value={inputValue || ''}
                                            value={props.values['email']}
                                            name="email"
                                        />
                                        <i
                                            role="presentation"
                                            className="input-close cursor-pointer"
                                            onClick={() => props.setFieldValue('email', '')}
                                        />
                                        {props.errors.email && (
                                            <div className="error-el">{props.errors.email}</div>
                                        )}
                                    </div>
                                    <div>
                                        <Field
                                            id="acceptTerms"
                                            name="acceptTerms"
                                            className="text-green-250 w-5 h-5 border-2 rounded mr-2.5"
                                            type="checkbox"
                                        />
                                        <label
                                            htmlFor="acceptTerms"
                                            className="text-xs font-medium">
                                            {t('I have read and acept the')}
                                            <span className="text-orange-450">
                                                <Link href={'/'}>{t('terms of use')}</Link>
                                            </span>
                                        </label>
                                    </div>

                                    <ErrorMessage
                                        name="acceptTerms"
                                        component="div"
                                        className="error-el"
                                    />

                                    <button type="submit" className="gradient-btn w-full mt-4">
                                        {t('Sign up')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
}

Signup.Layout = FullLayout;

export async function getServerSideProps(context: any) {
    const { req, locale } = context;
    const session = await getSession({ req });

    if (session) {
        return {
            redirect: { destination: '/' }
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
