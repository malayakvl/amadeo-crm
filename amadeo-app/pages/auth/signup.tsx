import FullLayout from '../../components/layout/FullLayout';
import { InputText } from '../../components/_form';
import ProviderBtns from '../../components/auth/ProviderBtns';
import Image from 'next/image';
import React from 'react';
import { providers, getSession } from 'next-auth/client';
import Link from 'next/link';

export default function Signup({ providers, locale }: { providers: any; locale: string }) {
    return (
        <div className="flex justify-center">
            <div className="rounded-lg border shadow-xl mt-10 flex w-[1000px] bg-white px-20 py-14">
                <div className="font-bold mt-8 pr-12 w-2/4">
                    <div className="text-5xl line-height-105percent mb-9">
                        Sing up
                        <br />
                        today!
                    </div>

                    <div className="mb-4 text-2xl line-height-105percent">
                        Lorem ipsum dolor
                        <br />
                        sit amet, consectetur
                        <br />
                        adipiscing elit.
                    </div>

                    <div className="font-normal mb-10 text-blue-350">
                        Lorem ipsum dolor sit amet,
                        <br />
                        consectetur adipiscing elit.
                    </div>

                    <Link href={'/auth/signin'}>
                        <a className="font-bold text-orange-450">
                            Already have an account? Sign in here!
                        </a>
                    </Link>
                </div>

                <div className="pl-12 border-l w-2/4">
                    <div className="flex mb-14">
                        <div className="w-16 leading-10 text-gray-200 font-bold text-5xl">1.</div>
                        <div className="">
                            <div className="font-bold mb-2.5">
                                How would you like to Sign up as? :
                            </div>

                            <label className="block mb-4 text-gray-180 text-xs">
                                <input name="test" className="radio mr-2.5" type="radio" />
                                <span>Buyer</span>
                            </label>

                            <label className="block text-gray-180 text-xs">
                                <input name="test" className="radio mr-2.5" type="radio" />
                                <span>Seller</span>
                            </label>

                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-16 leading-10 text-gray-200 font-bold text-5xl">2.</div>
                        <div>
                            <ProviderBtns Providers={providers} locale={locale} />

                            <div
                                style={{ lineHeight: '0.1em' }}
                                className="text-center border-b my-5">
                                <span className="bg-white px-6">or</span>
                            </div>

                            <InputText
                                icon={'f-email'}
                                style={null}
                                label={null}
                                name={'email'}
                                placeholder={'Email'}
                                props={{
                                    values: { email: '' },
                                    errors: { email: '' }
                                }}
                            />

                            <div className="text-xs font-medium mb-4">
                                <input className="text-green-250 w-5 h-5 border-2 rounded mr-2.5" type="checkbox" />
                                <span>
                                    I have read and acept the{' '}
                                    <span className="text-orange-450">terms of use</span>
                                </span>
                            </div>
                            <div className="gradient-btn">Sign up</div>
                        </div>
                    </div>
                </div>
            </div>
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
