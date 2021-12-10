import { providers, getSession } from 'next-auth/client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as Yup from 'yup';
import ProviderBtns from '../../components/auth/ProviderBtns';
import { InputText } from '../../components/_form'
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import FullLayout from '../../components/layout/FullLayout';
import Image from 'next/image'

function Signin({ providers, locale }: { providers: any; locale: string }) {
    const t = useTranslations();
    const router = useRouter();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email(t('Must be a valid email')).required(t('Required field')),
        password: Yup.string().required(t('Required field'))
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const onSubmit = (user: any) => {
        signIn('credentials_login', {
            email: user.email,
            password: user.password,
            callbackUrl: `${window.location.origin}${locale === 'fr' ? '' : `/${locale}`}/dashboard`
        });
    };

    return (
        <div className="flex justify-center">
            <div className="mt-10 rounded-lg bg-white w-96 p-10 pb-24">
                <div className="mb-2 font-sm">Welcome back!</div>
                <div className="mb-8 font-bold text-3xl line-height-105percent">Please sign into your account.</div>

                <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
                    <InputText
                        icon={'f-email'}
                        label={null}
                        name={'email'}
                        placeholder={'Email'}
                        props={{
                            values: { email: '' },
                            errors: { email: '' }
                        }}
                    />

                    <InputText
                        icon={'f-password'}
                        label={null}
                        name={'password'}
                        placeholder={'Password'}
                        props={{
                            values: { password: '' },
                            errors: { password: '' }
                        }}
                    />

                    <div className="text-gray-450 flex items-center mb-5">
                        <input type="checkbox" className="mr-2" />
                        <div className="text-xs">Remember me</div>
                        <Link href={'/auth/restore'}><a className="ml-auto text-xs text-orange-450">Forgot password?</a></Link>
                    </div>

                    <div className="mb-6">
                        <button
                            className="gradient-btn w-full px-3 py-4 text-white bg-indigo-500 rounded-md
                                    hover:bg-indigo-600
                                    focus:outline-none duration-100 ease-in-out"
                            disabled={formState.isSubmitting}>
                            Login
                        </button>
                    </div>

                    <div className="">
                        <div style={{ lineHeight: '0.1em' }} className="text-center border-b my-5">
                            <span className="bg-white px-6">or</span>
                        </div>
                    </div>
                </form>

                <button className="w-full mb-2 px-11 py-2 rounded-lg flex items-center bg-social-facebook font-bold text-white">
                    <div className="mr-2.5 flex items-center justify-center">
                        <Image
                            width={24}
                            height={24}
                            src='/images/social/facebook-solid.svg'
                            layout="fixed"
                            alt=""
                        />
                    </div>

                    <div className="text-sm">Continue with Facebook</div>
                </button>

                <button className="w-full mb-6 px-11 py-2 rounded-lg flex items-center font-bold text-gray-450 border">
                    <div className="mr-2.5 flex items-center justify-center">
                        <Image
                            width={24}
                            height={24}
                            src='/images/social/google.svg'
                            layout="fixed"
                            alt=""
                        />
                    </div>
                    <div className="text-sm">Continue with Google</div>
                </button>

                <div className="border-t text-center text-sm">
                    <div className="mb-2 pt-1">
                        Don’t have an account? <Link href={'/auth/signup'}><a className="text-orange-450 font-bold">Sign up here!</a></Link>
                    </div>
                    <div className="text-gray-450">By signing in, you accept the terms of use</div>
                </div>
                {/* <ProviderBtns Providers={providers} locale={locale} /> */}
            </div>
        </div>
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
