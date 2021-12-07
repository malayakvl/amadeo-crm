import Image from 'next/image'

export default function () {
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
                            <div className="mb-2">Pricing</div>
                            <div>Start your free trial</div>

                        </div>
                        <div>
                            <div className="mb-2 font-bold text-white">Resources</div>
                            <div className="mb-2">Customer Stories</div>
                            <div className="mb-2">FAQ</div>
                            <div className="mb-2">Support Center</div>
                            <div>Contact us</div>

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
                        <div className="mr-5">About Liveproshop</div>
                        <div className="mr-5">Cookies</div>
                        <div className="mr-5">Privacy</div>
                        <div className="mr-5">Terms</div>
                        <div className="text-white">@ 2021 Liveproshop</div>

                    </div>

                </div>

            </div>

        </footer>
    )


}