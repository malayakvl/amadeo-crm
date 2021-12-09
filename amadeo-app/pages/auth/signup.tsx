import FullLayout from '../../components/layout/FullLayout';
import Image from 'next/image';

export default function Signup() {
    return (
        <div className="flex justify-center">
            <div className="mt-10 flex w-1000 bg-white">

                <div>
                    <div>Sing up <br></br>today!</div>

                    <div>
                        Lorem ipsum dolor<br></br>
                        sit amet, consectetur<br></br>
                        adipiscing elit.
                    </div>

                    <div>
                        Lorem ipsum dolor sit amet,<br></br>
                        consectetur adipiscing elit.
                    </div>

                    <div>Already have an account? Sign in here!</div>
                </div>

                <div className="pl-12 border-l">
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

                                <div>Continue with Facebook</div>
                            </div>
                            <div className="mb-2 px-11 py-2 rounded-lg flex items-center bg-social-twitter font-bold text-white">
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
                            </div>
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
                                <div>Continue with Google</div>
                            </div>

                            <div className="">
                                <div style={{ lineHeight: '0.1em' }} className="text-center border-b my-5">
                                    <span className="bg-white px-6">or</span>
                                </div>
                            </div>

                            <div>Email</div>
                            <div>I have read and acept the terms of use</div>
                            <div>Sign up</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
Signup.Layout = FullLayout;
