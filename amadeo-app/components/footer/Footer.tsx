import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="w-full h-370 bottom-0 absolute">
            <div className="tracking-wide text-sm text-blue-light bg-blue-dark flex h-full justify-between flex-col py-16 px-32">
                <div className="flex justify-between">
                    <div>
                        <Image
                            className=""
                            src="/images/logo.svg"
                            width={175}
                            height={52}
                            layout="fixed"
                            alt=""
                        />
                    </div>
                    <div className="flex">
                        <div className="mr-9">
                            <div className="mb-2 font-bold text-white">Get started</div>
                            <div className="mb-2">
                                <Link href={'/'}>Pricing</Link>
                            </div>
                            <div>
                                <Link href={'/'}>Start your free trial</Link>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 font-bold text-white">Resources</div>
                            <div className="mb-2">
                                <Link href={'/'}>Customer Stories</Link>
                            </div>
                            <div className="uppercase mb-2">
                                <Link href={'/'}>Faq</Link>
                            </div>
                            <div className="mb-2">
                                <Link href={'/'}>Support Center</Link>
                            </div>
                            <div>
                                <Link href={'/'}>Contact us</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 flex justify-between border-t border-blue-medium">
                    <div className="flex">
                        <div className="mr-10">
                            <Image
                                src="/images/social/facebook.svg"
                                width={15}
                                height={15}
                                layout="fixed"
                                alt=""
                            />
                        </div>

                        <div className="mr-10">
                            <Image
                                src="/images/social/instagram.svg"
                                width={15}
                                height={15}
                                layout="fixed"
                                alt=""
                            />
                        </div>

                        <div>
                            <Image
                                className=""
                                src="/images/social/linkedin.svg"
                                width={15}
                                height={15}
                                layout="fixed"
                                alt=""
                            />
                        </div>
                    </div>

                    <div className="flex">
                        <div className="mr-5">
                            <Link href={'/'}>About Liveproshop</Link>
                        </div>
                        <div className="mr-5">
                            <Link href={'/'}>Cookies</Link>
                        </div>
                        <div className="mr-5">
                            <Link href={'/'}>Privacy</Link>
                        </div>
                        <div className="mr-5">
                            <Link href={'/'}>Terms</Link>
                        </div>
                        <div className="text-white">@ 2021 Liveproshop</div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
