import { providers, getSession } from "next-auth/client";
import { useTranslations } from 'next-intl'
import Link from "next/link"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as Yup from 'yup';
import ProviderBtns from '../../components/auth/ProviderBtns';
import { signIn } from "next-auth/client";
import { useRouter } from 'next/router'

function Signin({providers, locale} : {providers:any, locale: string}) {
    const t = useTranslations();
    const router = useRouter();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email(t('Must be a valid email'))
            .required(t('Required field')),
        password: Yup.string()
            .required(t('Required field'))
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = (user:any) => {
        signIn('credentials_login',
            {
                email: user.email,
                password: user.password,
                callbackUrl: `${window.location.origin}${locale === 'fr' ? '' : `/${locale}`}/dashboard`
            }
        )
    }

    return (
        <div className="flex justify-center min-h-screen">
            <div className="container sm:mt-10 mt-10 my-auto max-w-md rounded-lg p-3 bg-white">
                <div className="text-center my-6">
                    <h1 className="text-3xl font-semibold text-gray-700">{t('Sign In')}</h1>
                </div>
                <div className="m-6">
                    <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-6">
                            <label htmlFor="email">{t('Email Address')}</label>
                            <input
                                type="email"
                                id="email"
                                {...register('email')}
                                placeholder={t('Your email address')}
                                className="txt-input"
                            />
                            <div className="error-el">{errors.email?.message}</div>
                            <div className="error-el">{router.query.message}</div>
                        </div>
                        <div className="mb-6">
                            <div className="flex justify-between mb-2">
                                <label htmlFor="password">{t('Password')}</label>
                                <Link href={'/auth/restore'}>
                                    <a
                                       className="text-sm text-gray-400 cursor-pointer
                                        focus:outline-none focus:text-indigo-500
                                        hover:text-indigo-500
                                        dark:hover:text-indigo-300">
                                        {t('Forgot password?')}
                                    </a>
                                </Link>
                            </div>
                            <input
                                type="password"
                                id="password"
                                {...register('password')}
                                placeholder={t('Your password')}
                                className="txt-input"
                            />
                            <div className="error-el">{errors.password?.message}</div>
                        </div>
                        <div className="mb-6">
                            <button
                                className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md
                                    hover:bg-indigo-600
                                    focus:outline-none duration-100 ease-in-out"
                                disabled={formState.isSubmitting}
                            >
                                {t('Sign In')}
                            </button>
                        </div>
                        <p className="text-sm text-center text-gray-400">
                            {t('Don`t have an account yet?')}
                            <Link href={'/auth/signup'}>
                                <a className="font-semibold text-indigo-500
                                    focus:text-indigo-600 focus:outline-none focus:underline">
                                    {t('Sign Up')}.
                                </a>
                            </Link>
                        </p>
                    </form>
                    <div className="flex flex-row justify-center mb-8">
                        <span className="absolute bg-white px-4 text-gray-500">{t('or sign-in with')}</span>
                        <div className="w-full bg-gray-200 mt-3 h-px" />
                    </div>

                    <ProviderBtns Providers={providers} locale={locale} />

                </div>
            </div>
        </div>
    );
}

export default Signin;

export async function getServerSideProps(context:any) {
    const { req, locale } = context;
    const session = await getSession({req});
    if (session) {
        return {
            redirect: {destination: `/${locale === 'fr' ? '' : locale}`},
        };
    }
    return {
        props: {
            providers: await providers(),
            locale: locale,
            messages: {
                ...require(`../../messages/auth/${locale}.json`),
                ...require(`../../messages/errors/${locale}.json`),
            },
        },
    };
}
