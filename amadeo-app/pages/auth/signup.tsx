import FullLayout from '../../components/layout/FullLayout';
import { InputText } from '../../components/_form';

import Image from 'next/image';

export default function Signup() {
    return (
        <div className="flex justify-center">
            <div className="rounded-lg border shadow-xl mt-10 flex w-1000 bg-white px-20 py-14">

                <div className="font-bold mt-8 pr-12 w-2/4">
                    <div className="text-5xl line-height-105percent mb-9">
                        Sing up<br></br>
                        today!
                    </div>

                    <div className="mb-4 text-2xl line-height-105percent">
                        Lorem ipsum dolor<br></br>
                        sit amet, consectetur<br></br>
                        adipiscing elit.
                    </div>

                    <div className="font-normal mb-10 text-blue-350">
                        Lorem ipsum dolor sit amet,<br></br>
                        consectetur adipiscing elit.
                    </div>

                    <div className="font-bold text-orange-450">Already have an account? Sign in here!</div>
                </div>

                <div className="pl-12 border-l w-2/4">
                    <div className="flex mb-14">
                        <div className="w-16 leading-10 text-gray-200 font-bold text-5xl">1.</div>
                        <div className="">
                            <div className="font-bold mb-2.5">How would you like to Sign up as? :</div>
                            <div className="flex mb-4">
                                <Image
                                    className="mr-2.5"
                                    width={20}
                                    height={20}
                                    src='/images/option-applied.svg'
                                    layout="fixed"
                                    alt=""
                                />
                                <div className="text-blue-350 text-sm ml-2.5">Buyer</div>
                            </div>
                            <div className="flex">
                                <Image
                                    width={20}
                                    height={20}
                                    src='/images/option.svg'
                                    layout="fixed"
                                    alt=""
                                />

                                <div className="text-gray-180 text-sm ml-2.5">Merchant</div>
                            </div>

                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-16 leading-10 text-gray-200 font-bold text-5xl">2.</div>
                        <div className="">
                            <div className="mb-2 px-11 py-2 rounded-lg flex items-center bg-social-facebook font-bold text-white">
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
                            </div>
                            {/* <div className="mb-2 px-11 py-2 rounded-lg flex items-center bg-social-twitter font-bold text-white">
                                <div className="mr-2.5 flex items-center justify-center">
                                    <Image
                                        width={24}
                                        height={24}
                                        src='/images/social/twitter.svg'
                                        layout="fixed"
                                        alt=""
                                    />
                                </div>
                                <div>Continue with Twitter</div>
                            </div> */}
                            <div className="mb-2.5 px-11 py-2 rounded-lg flex items-center font-bold text-gray-450 border">
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
                            </div>

                            <div className="">
                                <div style={{ lineHeight: '0.1em' }} className="text-center border-b my-5">
                                    <span className="bg-white px-6">or</span>
                                </div>
                            </div>

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

                            <div className="text-sm mb-4">
                                <input className="mr-2.5" type="checkbox"></input>
                                <span>I have read and acept the terms of use</span>
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
