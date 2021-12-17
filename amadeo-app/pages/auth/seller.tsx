import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { providers, getSession, signIn } from 'next-auth/client';
import { useTranslations } from 'next-intl';
import ProviderBtns from '../../components/auth/ProviderBtns';
import FullLayout from '../../components/layout/FullLayout';
import Image from 'next/image';
import InputTextDisabled from '../../components/_form/InputTextDisabled';

interface Props {
    label: string | 'text';
    type: string;
    name: string;
    register: any;
    errors: any;
}
const InputText: React.FC<Props> = ({ label, type, name, register, errors }) => {
    const t = useTranslations();

    return (
        <div className="mb-4">
            <label htmlFor="email">{t(label)}</label>
            <input
                {...register(name)}
                type={type}
                id={name}
                placeholder={t(label)}
                className="txt-input"
            />
            <div className="error-el">{errors[name]?.message}</div>
        </div>
    );
};

function Seller({ providers, locale }: { providers: any; locale: string }) {
    const t = useTranslations();
    const router = useRouter();
    const [showAlert, setShowAlert] = useState(!!router.query.message);
    const { message } = router.query;

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
    const formOptions = { validationSchema };

    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;

    const onSubmit = (user: any) => {
        setShowAlert(false);
        signIn('credentials_registration', {
            user: JSON.stringify(user),
            callbackUrl: `${window.location.origin}${locale === 'fr' ? '' : `/${locale}`}/dashboard`
        });
    };

    return (
        <div className="flex justify-center">
            <div className="px-24 py-14 mt-10 rounded-lg border shadow-xl flex justify-center w-[996px] bg-white">
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
                <div className="w-6/12">
                    2
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
