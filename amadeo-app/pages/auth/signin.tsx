import { providers, getSession } from 'next-auth/client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
// import ProviderBtns from '../../components/auth/ProviderBtns';
import { InputText, InputPassword } from '../../components/_form';
import { signIn } from 'next-auth/client';
import FullLayout from '../../components/layout/FullLayout';
import { Formik, Field } from 'formik';
import Head from 'next/head';
import Image from 'next/image';
import { accountService } from '../../_services';

function Signin({ locale }: { locale: string }) {
    const t = useTranslations();
    const { query } = useRouter();

    const SubmitSchema = Yup.object().shape({
        email: Yup.string().email(t('Must be a valid email')).required(t('Required field')),
        password: Yup.string().required(t('Required field'))
    });
    return (
        <>
            <Head>
                <title>Amadeo CRM - Sign In</title>
            </Head>

            <div className="flex justify-center">
                <div className="mt-10 rounded-lg bg-white w-96 p-10 pb-24">
                    <div className="mb-2 font-sm">{t('Welcome back!')}</div>
                    <div className="mb-8 font-bold text-3xl line-height-105percent">
                        {t('Please sign into your account')}
                    </div>

                    {query.message && (
                        <div className="error-el mb-4">
                            <span className="text-sm">{query.message}</span>
                        </div>
                    )}
                    <Formik
                        enableReinitialize
                        initialValues={{}}
                        validationSchema={SubmitSchema}
                        onSubmit={(values) => {
                            signIn('credentials_login', {
                                email: (values as any).email,
                                password: (values as any).password,
                                callbackUrl: `${window.location.origin}${
                                    locale === 'fr' ? '' : `/${locale}`
                                }/dashboard`
                            });
                        }}>
                        {(props) => (
                            <form onSubmit={props.handleSubmit} className="mb-4">
                                <InputText
                                    style={null}
                                    icon={'f-email'}
                                    label={null}
                                    name={'email'}
                                    placeholder={'Email'}
                                    props={props}
                                    tips={null}
                                    onChange={(event) => {
                                        event.target.value = event.target.value.trim();
                                        props.handleChange(event);
                                    }}
                                />

                                <InputPassword
                                    style={null}
                                    icon={'f-password'}
                                    label={null}
                                    name={'password'}
                                    placeholder={'Password'}
                                    props={props}
                                />

                                <div className="text-gray-450 flex items-center mb-5">
                                    <Field
                                        id="acceptTerms"
                                        name="acceptTerms"
                                        className="text-green-250 w-5 h-5 border-2 rounded mr-2.5"
                                        type="checkbox"
                                    />
                                    <div className="text-xs">{t('Remember me')}</div>
                                    <Link href={'/auth/restore'}>
                                        <a className="ml-auto text-xs text-orange-450">
                                            {t('Forgot password?')}
                                        </a>
                                    </Link>
                                </div>

                                <div className="mb-6">
                                    <button
                                        className="gradient-btn w-full px-3 py-4 text-white bg-indigo-500 rounded-md
                                    hover:bg-indigo-600
                                    focus:outline-none duration-100 ease-in-out">
                                        {t('Login')}
                                    </button>
                                </div>

                                <div className="">
                                    <div
                                        style={{ lineHeight: '0.1em' }}
                                        className="text-center border-b my-5">
                                        <span className="bg-white px-6">{t('or')}</span>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>

                    {/*<ProviderBtns Providers={providers} locale={locale} />*/}
                    <button
                        className="image-btn bg-social-facebook text-white"
                        onClick={() => accountService.loginFB()}>
                        <Image
                            width={24}
                            height={24}
                            src="/images/social/facebook-solid.svg"
                            layout="fixed"
                            alt=""
                        />
                        <div className="text-sm ml-2.5">{t('Continue with Facebook')}</div>
                    </button>

                    <div className="mt-3 border-t text-center text-sm">
                        <div className="mb-2 pt-1">
                            {t('Don’t have an account?')}{' '}
                            <Link href={'/auth/signup'}>
                                <a className="text-orange-450 font-bold">{t('Sign up here!')}</a>
                            </Link>
                        </div>
                        <div className="text-gray-450">
                            {t('By signing in, you accept the')}{' '}
                            <a
                                href="https://www.liveproshop.com/terms-and-conditions"
                                target="_blank"
                                rel="noreferrer"
                                className="text-orange-450">
                                {t('terms of use')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
Signin.Layout = FullLayout;

export default Signin;

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
