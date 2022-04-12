import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/client';
import React from 'react';
import { Menu } from '@headlessui/react';
import LangSwitcher from '../lang/Switcher';

const userProfileImg =
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

const Header: React.FC = () => {
    const [session] = useSession();

    return (
        <header>
            <nav className="px-4 bg-white flex flex-wrap items-center justify-between md:px-32 py-10">
                <div className="cursor-pointer">
                    <Link href={'/'}>
                        <a>
                            <Image src="/images/logo.svg" width="250" height="40" alt="" />
                        </a>
                    </Link>
                </div>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="menu-button"
                    className="h-6 w-6 cursor-pointer md:hidden block"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>

                <div
                    className="flex flex-wrap justify-center justify-items-end flex-auto mx-2 xl:mx-4 2xl:mx-7 my-4 lg:my-0 font-bold text-sm"
                    id="menu">
                    <Link href={'/'}>
                        <a className="m-2 xl:mx-4 2xl:mx-7 hover:text-purple-400">Features</a>
                    </Link>

                    <Link href={'/pricing'}>
                        <a className="m-2 xl:mx-4 2xl:mx-7 hover:text-purple-400">Pricing</a>
                    </Link>

                    <Link href={'/'}>
                        <a className="m-2 xl:mx-4 2xl:mx-7 hover:text-purple-400">Case Studies</a>
                    </Link>

                    <Link href={'/'}>
                        <a className="m-2 xl:mx-4 2xl:mx-7 hover:text-purple-400 uppercase">Faq</a>
                    </Link>

                    <Link href={'/contact-us'}>
                        <a className="m-2 xl:mx-4 2xl:mx-7 hover:text-purple-400">Contact Us</a>
                    </Link>
                </div>
                <div className="font-bold text-sm flex flex-wrap flex-none space-x-4 justify-end">
                    {!session?.user ? (
                        <>
                            <Link href={'/auth/signup'}>
                                <button className="gradient-btn">
                                    <a>Try for free</a>
                                </button>
                            </Link>
                            <Link href={'/auth/signin'}>
                                <button className="disabled-btn">
                                    <a className="">Login</a>
                                </button>
                            </Link>
                        </>
                    ) : (
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6 md:mt-3">
                                {/* Profile dropdown */}
                                <Menu as="div" className="ml-5 relative -mt-2">
                                    <div>
                                        <Menu.Button
                                            className="max-w-xs bg-gray-800 rounded-full flex
                                            items-center text-sm focus:outline-none focus:ring-2
                                            focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                            <span className="sr-only">Open user menu</span>
                                            <Image
                                                src={userProfileImg}
                                                width={35}
                                                height={35}
                                                className="rounded-full"
                                                alt=""
                                            />
                                        </Menu.Button>
                                    </div>
                                </Menu>
                            </div>
                        </div>
                    )}

                    <LangSwitcher />
                </div>
            </nav>
        </header>
    );
};

export default Header;
