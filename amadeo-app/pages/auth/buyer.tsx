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
