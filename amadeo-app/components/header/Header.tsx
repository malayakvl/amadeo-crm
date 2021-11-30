import Image from "next/image";
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/client'
import { Fragment, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/outline'
import LangSwitcher from "../lang/switcher";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/user/selectors";

const userProfileImg =
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'

const userNavigation = [
    { name: 'My Account', href: '/account' },
    { name: 'Change password', href: '/auth/changePassword' },
]

function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
}

const Header: React.FC = () => {
    const [session] = useSession();
    const user = useSelector(userSelector);

    useEffect(function() {
        switch (user.role_id) {
            case 1:
                userNavigation.push({ name: 'Products', href: '/products' });
                break;
            case 3:
                userNavigation.push({ name: 'Customers', href: '/customers' });
                userNavigation.push({ name: 'Buyers', href: '/customers' });
                break;
        }
    },[user]);

    return (
        <header>
            <nav
                className="flex flex-wrapitems-center justify-between w-full
                        py-4
                        md:py-0
                        px-4
                        text-lg text-gray-700
                        bg-white"
            >
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="inline-flex mt-1 -ml-2.5 mr-3">
                        <Image
                            className=""
                            src="/images/logo.svg"
                            width={40}
                            height={40}
                            layout="fixed"
                            alt=""
                        />
                    </div>
                    <p className="inline-flex items-center justify-center">Amadeo Online Shop</p>

                </div>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="menu-button"
                    className="h-6 w-6 cursor-pointer md:hidden block"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>

                <div className="hidden w-full md:flex md:items-center md:w-auto" id="menu">
                    <LangSwitcher />
                    <ul
                        className="
                          pt-4
                          text-base text-gray-700
                          md:flex
                          md:justify-between
                          md:pt-0"
                    >
                        <li>
                            <a className="md:p-4 py-2 block hover:text-purple-400" href="#">Features</a>
                        </li>
                        <li>
                            <Link href={'/pages/price'}><a className="md:p-4 py-2 block hover:text-purple-400" href="#">Pricing</a></Link>
                        </li>
                        {!session?.user ?
                            (
                                <>
                                    <li>
                                        <Link href={'/auth/signin'}>
                                            <a className="md:p-4 py-2 block hover:text-purple-400 text-purple-500">Log In</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={'/auth/signup'}>
                                            <a className="md:p-4 py-2 block hover:text-purple-400 text-purple-500">Sign Up</a>
                                        </Link>
                                    </li>
                                </>
                            ) :
                            (
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6 md:mt-3">
                                        <button
                                            type="button"
                                            className="bg-white p-1 rounded-full text-gray-400 hover:text-blue-200
                                                focus:outline-none focus:ring-2 focus:ring-offset-2
                                                focus:ring-offset-gray-800 focus:ring-blue-200"
                                        >
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>

                                        {/* Profile dropdown */}
                                        <Menu as="div" className="ml-3 relative">
                                            <div>
                                                <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex
                                                    items-center text-sm focus:outline-none focus:ring-2
                                                    focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                    <span className="sr-only">Open user menu</span>
                                                    <Image src={userProfileImg} width={35} height={35} className="rounded-full" alt="" />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="origin-top-right absolute right-0 mt-2
                                                    w-48 rounded-md shadow-lg py-1 bg-white ring-1
                                                    ring-white ring-opacity-5 focus:outline-none">
                                                    {userNavigation.map((item) => (
                                                        <Menu.Item key={item.name}>
                                                            {({ active }) => (
                                                                <Link href={item.href}>
                                                                    <a
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100' : '',
                                                                            'block px-4 py-2 text-sm text-gray-700'
                                                                        )}>
                                                                    {item.name}
                                                                </a>
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                    ))}
                                                    <Menu.Item>
                                                        <a
                                                            href={`/api/auth/signout`}
                                                            className="block px-4 py-2 text-sm text-gray-700"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                window.localStorage.removeItem('user')
                                                                signOut()
                                                            }}
                                                        >
                                                            Sign out
                                                        </a>
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>
                            )}

                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header;


