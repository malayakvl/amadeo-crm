import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/client';
import React from 'react';
import { Menu } from '@headlessui/react';

const userProfileImg =
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

const Header: React.FC = () => {
    const [session] = useSession();

    return (
        <header>
            <nav className="bg-white flex items-center justify-between px-32 h-144">
                <div className="relative -top-2 cursor-pointer">
                    <Link href={'/'}>
                        <a>
                            <Image src="/images/logo.svg" width={175} height={52} alt="" />
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

                <div className="font-bold text-sm flex items-center justify-end" id="menu">
                    <Link href={'/'}>
                        <a className="hover:text-purple-400">Features</a>
                    </Link>
                    <Link href={'/pages/price'}>
                        <a className="ml-14 hover:text-purple-400">Pricing</a>
                    </Link>
                    <Link href={'/'}>
                        <a className="ml-14 hover:text-purple-400">Case Studies</a>
                    </Link>

                    <Link href={'/'}>
                        <a className="ml-14 uppercase hover:text-purple-400">Faq</a>
                    </Link>

                    {!session?.user ? (
                        <>
                            <Link href={'/auth/signup'}>
                                <button className="ml-14 gradient-btn">
                                    <a>Try for free</a>
                                </button>
                            </Link>
                            <Link href={'/auth/signin'}>
                                <button className="ml-14 disabled-btn">
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
                </div>
            </nav>
        </header>
    );
};

export default Header;
