import { providers, getSession } from "next-auth/client";
import { useTranslations } from 'next-intl'
import Link from "next/link"
import LangSwitcher from "../../components/lang/switcher";
import ProviderBtns from '../../components/auth/ProviderBtns';

export default Signin;

function Signin({providers} : {providers:any}) {
    const t = useTranslations()
    return (
        <div className="flex justify-center min-h-screen bg-gray-100">
            <div className="container sm:mt-40 mt-24 my-auto max-w-md border-2 border-gray-200 p-3 bg-white">
                <LangSwitcher />

                <div className="text-center my-6">
                    <h1 className="text-3xl font-semibold text-gray-700">{t('Sign In')}</h1>
                </div>
                <div className="m-6">
                    <form className="mb-4">
                        <div className="mb-6">
                            <label htmlFor="email">{t('Email Address')}</label>
                            <input
                                type="email"
                                name="email" id="email"
                                placeholder={t('Your email address')}
                                className="txt-input"
                            />
                        </div>
                        <div className="mb-6">
                            <div className="flex justify-between mb-2">
                                <label htmlFor="password">{t('Password')}</label>
                                <a href="#"
                                   className="text-sm text-gray-400
                                    focus:outline-none focus:text-indigo-500
                                    hover:text-indigo-500
                                    dark:hover:text-indigo-300">
                                    {t('Forgot password?')}
                                </a>
                            </div>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder={t('Your password')}
                                className="txt-input"
                            />
                        </div>
                        <div className="mb-6">
                            <button type="button"
                                    className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md
                                    hover:bg-indigo-600
                                    focus:outline-none duration-100 ease-in-out">
                                {t('Sign In')}
                            </button>
                        </div>
                        <p className="text-sm text-center text-gray-400">
                            {t('Don`t have an account yet?')}
                            <Link href="/auth/registration">
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

                    <ProviderBtns Providers={providers} />

                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context:any) {
    const { req, locale } = context;
    const session = await getSession({req});
    if (session) {
        return {
            redirect: {destination: `/${locale}`},
        };
    }

    return {
        props: {
            providers: await providers(),
            locale: locale,
            messages: {
                ...require(`../../messages/auth/${locale}.json`),
            },
        },
    };
}
