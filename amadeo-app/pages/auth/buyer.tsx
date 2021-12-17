import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { providers, getSession, signIn } from 'next-auth/client';
import { useTranslations } from 'next-intl';
import ProviderBtns from '../../components/auth/ProviderBtns';
import FullLayout from '../../components/layout/FullLayout';
import getConfig from 'next/config';
import Image from 'next/image';
import { InputText } from '../../components/_form';
import { Formik } from 'formik';
import { InputPassword } from '../../components/_form'

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/auth`;

interface Props {
    label: string | 'text';
    type: string;
    name: string;
    register: any;
    errors: any;
}

function Buyer({ providers, locale }: { providers: any; locale: string }) {
    const t = useTranslations();
    const router = useRouter();
    const [showAlert, setShowAlert] = useState(!!router.query.message);
    const { message } = router.query;

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email(t('Must be a valid email'))
            .required(t('You must enter your email')),
        terms: Yup.boolean().oneOf([true], t('Confirm terms')),
        password: Yup.string()
            .required(t('Required field'))
            .min(3, t('Password must be at least 6 characters')),
        password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            t('Passwords must match')
        )
    });

    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;
    const onSubmit = (values: any) => {
        console.log(values)
    };

    return (
        <div className="flex justify-center">
            <div className="mt-10 rounded-lg border shadow-xl bg-white w-96 p-10 pb-10">
                <div className="flex items-center mb-4">
                    <div className="mr-2.5 font-bold text-3xl line-height-105percent w-60">Your email has been verified!</div>
                    <Image
                        src="/images/tick.svg"
                        width="52"
                        height="40"
                        layout="fixed"
                    />
                </div>

                <div className="flex mb-4 border p-3 bg-gray-100 rounded-lg">
                    <Image
                        src="/images/input-email.svg"
                        width="24"
                        height="24"
                        layout="fixed"
                    />

                    <span className="ml-2.5 text-gray-180 font-bold text-sm">email@email.com</span>

                </div>

                <Formik
                    enableReinitialize
                    initialValues={{}}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}>
                    {(props) => (
                        <form>
                            <div className="mt-8 mb-5 font-xs text-sm text-blue-350">
                                Please create a Password
                            </div>

                            <InputPassword
                                icon={'f-key'}
                                style={null}
                                label={null}
                                name={'email'}
                                placeholder={'Password'}
                                props={props}
                            />

                            <InputPassword
                                icon={'f-key'}
                                style="mb-9"
                                label={null}
                                name={'email'}
                                placeholder={'Confirm Password'}
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
    )

    return (
        <div className="flex justify-center min-h-screen">
            <div className="container sm:mt-10 mt-10 my-auto max-w-md rounded-lg p-3 bg-white">
                <div className="text-center my-6">
                    <h1 className="text-3xl font-semibold text-gray-700">{t('Sign Up')}</h1>
                </div>
                <div className="m-6">
                    {showAlert && (
                        <div
                            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-10"
                            role="alert">
                            <span className="block sm:inline">{t(message as string)}</span>
                            <button
                                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                                onClick={() => {
                                    setShowAlert(false);
                                }}>
                                <svg
                                    className="fill-current h-6 w-6 text-red-500"
                                    role="button"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20">
                                    <title>Close</title>
                                    <path
                                        d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10
                                        8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}

                    <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden" {...register('role_id')} defaultValue="1" />
                        <InputText
                            label={'Email Address'}
                            type={'text'}
                            name={'email'}
                            register={register}
                            errors={errors}
                        />

                        <InputText
                            label={'Password'}
                            type={'password'}
                            name={'password'}
                            register={register}
                            errors={errors}
                        />
                        <InputText
                            label={'Confirm Password'}
                            type={'password'}
                            name={'password_confirmation'}
                            register={register}
                            errors={errors}
                        />

                        <div className="mb-6">
                            <input
                                {...register('terms')}
                                type="checkbox"
                                name="terms"
                                id="terms"
                                placeholder=""
                            />
                            <label htmlFor="terms" className="ml-5">
                                I agree with
                                <Link href={'/pages/terms'}>
                                    <a className="text-blue-500">Terms & Conditions</a>
                                </Link>
                            </label>
                            <div className="error-el">{errors.terms?.message}</div>
                        </div>

                        <div className="mb-6">
                            <button
                                className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md
                                    hover:bg-indigo-600
                                    focus:outline-none duration-100 ease-in-out"
                                disabled={formState.isSubmitting}>
                                {formState.isSubmitting && (
                                    <span className="spinner-border spinner-border-sm mr-1" />
                                )}
                                {t('Registration')}
                            </button>
                        </div>
                    </form>
                    <div className="flex flex-row justify-center mb-8">
                        <span className="absolute bg-white px-4 text-gray-500">
                            {t('or sign-up with')}
                        </span>
                        <div className="w-full bg-gray-200 mt-3 h-px" />
                    </div>

                    <ProviderBtns Providers={providers} locale={locale} />
                </div>
            </div>
        </div>
    );
}
Buyer.Layout = FullLayout;

export default Buyer;

export async function getServerSideProps(context: any) {
    const { hash } = context.query;
    const res = await fetch(`${baseUrl}/is-invitation-active?hash=${hash}`);
    const json = await res.json();


    if (!json.active) {
        return {
            redirect: { destination: '/' }
        };
    }

    return {
        props: {
        }
    };
}
