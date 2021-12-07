import Image from 'next/image';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/client';
import React, { Fragment, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../redux/user/selectors';
import NoticeCounter from './NoticeCounter';
import { fetchCntNewAction, fetchNewListAction } from '../../redux/notifications';

const userProfileImg =
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

const userNavigation = [
    { name: 'My Account', href: '/account' },
    { name: 'Change password', href: '/auth/changePassword' },
    { name: 'Notifications', href: '/notifications' }
];

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ');
}

const Header: React.FC = () => {
    const [session] = useSession();
    const user = useSelector(userSelector);
    const dispatch = useDispatch();

    useEffect(
        function () {
            if (session?.user?.email) {
                dispatch(fetchCntNewAction(user.email));
                dispatch(fetchNewListAction(user.email));
                switch (user.role_id) {
                    case 2:
                        userNavigation.push({ name: 'Products', href: '/products' });
                        break;
                    case 3:
                        userNavigation.push({ name: 'Customers', href: '/customers' });
                        userNavigation.push({ name: 'Buyers', href: '/customers' });
                        break;
                }
            }
        },
        [session]
    );
    <svg
        width="116"
        height="40"
        viewBox="0 0 116 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0.5 8.3999C0.5 3.98162 4.08172 0.399902 8.5 0.399902H107.5C111.918 0.399902 115.5 3.98162 115.5 8.3999V31.3999C115.5 35.8182 111.918 39.3999 107.5 39.3999H8.5C4.08172 39.3999 0.5 35.8182 0.5 31.3999V8.3999Z"
            fill="url(#paint0_linear_271_2287)"
        />

        <path
            d="M29.5387 15.5999L25.2967 25.3999H23.0567L18.8287 15.5999H21.2787L24.2607 22.5999L27.2847 15.5999H29.5387ZM30.3957 17.8679H32.5797V25.3999H30.3957V17.8679ZM31.4877 16.8179C31.0863 16.8179 30.7597 16.7012 30.5077 16.4679C30.2557 16.2346 30.1297 15.9452 30.1297 15.5999C30.1297 15.2546 30.2557 14.9652 30.5077 14.7319C30.7597 14.4986 31.0863 14.3819 31.4877 14.3819C31.889 14.3819 32.2157 14.4939 32.4677 14.7179C32.7197 14.9419 32.8457 15.2219 32.8457 15.5579C32.8457 15.9219 32.7197 16.2252 32.4677 16.4679C32.2157 16.7012 31.889 16.8179 31.4877 16.8179ZM42.0406 21.6619C42.0406 21.6899 42.0266 21.8859 41.9986 22.2499H36.3006C36.4033 22.7166 36.6459 23.0852 37.0286 23.3559C37.4113 23.6266 37.8873 23.7619 38.4566 23.7619C38.8486 23.7619 39.1939 23.7059 39.4926 23.5939C39.8006 23.4726 40.0853 23.2859 40.3466 23.0339L41.5086 24.2939C40.7993 25.1059 39.7633 25.5119 38.4006 25.5119C37.5513 25.5119 36.7999 25.3486 36.1466 25.0219C35.4933 24.6859 34.9893 24.2239 34.6346 23.6359C34.2799 23.0479 34.1026 22.3806 34.1026 21.6339C34.1026 20.8966 34.2753 20.2339 34.6206 19.6459C34.9753 19.0486 35.4559 18.5866 36.0626 18.2599C36.6786 17.9239 37.3646 17.7559 38.1206 17.7559C38.8579 17.7559 39.5253 17.9146 40.1226 18.2319C40.7199 18.5492 41.1866 19.0066 41.5226 19.6039C41.8679 20.1919 42.0406 20.8779 42.0406 21.6619ZM38.1346 19.4079C37.6399 19.4079 37.2246 19.5479 36.8886 19.8279C36.5526 20.1079 36.3473 20.4906 36.2726 20.9759H39.9826C39.9079 20.4999 39.7026 20.1219 39.3666 19.8419C39.0306 19.5526 38.6199 19.4079 38.1346 19.4079ZM55.5099 17.8679L52.7799 25.3999H50.6799L48.9859 20.7239L47.2359 25.3999H45.1359L42.4199 17.8679H44.4779L46.2559 22.9639L48.1039 17.8679H49.9519L51.7439 22.9639L53.5779 17.8679H55.5099ZM69.6741 25.3999L69.6601 19.5199L66.7761 24.3639H65.7541L62.8841 19.6459V25.3999H60.7561V15.5999H62.6321L66.3001 21.6899L69.9121 15.5999H71.7741L71.8021 25.3999H69.6741ZM77.6132 25.5119C76.8198 25.5119 76.1058 25.3486 75.4712 25.0219C74.8458 24.6859 74.3558 24.2239 74.0012 23.6359C73.6465 23.0479 73.4692 22.3806 73.4692 21.6339C73.4692 20.8872 73.6465 20.2199 74.0012 19.6319C74.3558 19.0439 74.8458 18.5866 75.4712 18.2599C76.1058 17.9239 76.8198 17.7559 77.6132 17.7559C78.4065 17.7559 79.1158 17.9239 79.7412 18.2599C80.3665 18.5866 80.8565 19.0439 81.2112 19.6319C81.5658 20.2199 81.7432 20.8872 81.7432 21.6339C81.7432 22.3806 81.5658 23.0479 81.2112 23.6359C80.8565 24.2239 80.3665 24.6859 79.7412 25.0219C79.1158 25.3486 78.4065 25.5119 77.6132 25.5119ZM77.6132 23.7199C78.1732 23.7199 78.6305 23.5332 78.9852 23.1599C79.3492 22.7772 79.5312 22.2686 79.5312 21.6339C79.5312 20.9992 79.3492 20.4952 78.9852 20.1219C78.6305 19.7392 78.1732 19.5479 77.6132 19.5479C77.0532 19.5479 76.5912 19.7392 76.2272 20.1219C75.8632 20.4952 75.6812 20.9992 75.6812 21.6339C75.6812 22.2686 75.8632 22.7772 76.2272 23.1599C76.5912 23.5332 77.0532 23.7199 77.6132 23.7199ZM85.345 18.8619C85.6063 18.4979 85.9563 18.2226 86.395 18.0359C86.843 17.8492 87.3563 17.7559 87.935 17.7559V19.7719C87.6923 19.7532 87.529 19.7439 87.445 19.7439C86.8197 19.7439 86.3297 19.9212 85.975 20.2759C85.6203 20.6212 85.443 21.1439 85.443 21.8439V25.3999H83.259V17.8679H85.345V18.8619ZM96.5993 21.6619C96.5993 21.6899 96.5853 21.8859 96.5573 22.2499H90.8593C90.9619 22.7166 91.2046 23.0852 91.5873 23.3559C91.9699 23.6266 92.4459 23.7619 93.0153 23.7619C93.4073 23.7619 93.7526 23.7059 94.0513 23.5939C94.3593 23.4726 94.6439 23.2859 94.9053 23.0339L96.0673 24.2939C95.3579 25.1059 94.3219 25.5119 92.9593 25.5119C92.1099 25.5119 91.3586 25.3486 90.7053 25.0219C90.0519 24.6859 89.5479 24.2239 89.1933 23.6359C88.8386 23.0479 88.6613 22.3806 88.6613 21.6339C88.6613 20.8966 88.8339 20.2339 89.1793 19.6459C89.5339 19.0486 90.0146 18.5866 90.6213 18.2599C91.2373 17.9239 91.9233 17.7559 92.6793 17.7559C93.4166 17.7559 94.0839 17.9146 94.6813 18.2319C95.2786 18.5492 95.7453 19.0066 96.0813 19.6039C96.4266 20.1919 96.5993 20.8779 96.5993 21.6619ZM92.6933 19.4079C92.1986 19.4079 91.7833 19.5479 91.4473 19.8279C91.1113 20.1079 90.9059 20.4906 90.8313 20.9759H94.5413C94.4666 20.4999 94.2613 20.1219 93.9253 19.8419C93.5893 19.5526 93.1786 19.4079 92.6933 19.4079Z"
            fill="white"
        />

        <defs>
            <linearGradient
                id="paint0_linear_271_2287"
                x1="0.5"
                y1="39.3999"
                x2="24.2237"
                y2="-30.5547"
                gradientUnits="userSpaceOnUse">
                <stop stopColor="#CA4573" />
                <stop offset="0.494792" stopColor="#EE5342" />
                <stop offset="1" stopColor="#EFBB58" />
            </linearGradient>
        </defs>
    </svg>;

    return (
        <header>
            <nav className="bg-white flex items-center justify-between px-28 h-144">
                <div className="relative -top-2">
                    <Image
                        src="/images/logo.svg"
                        width={175}
                        height={52}
                        alt=""
                    />
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

                <div className="w-2/4" id="menu">
                    <ul className="font-bold text-sm h-full w-full flex justify-between items-center">
                        <li>
                            <Link href={'/'}>
                                <a className="hover:text-purple-400">Features</a>
                            </Link>
                        </li>

                        <li>
                            <Link href={'/pages/price'}>
                                <a className="hover:text-purple-400">Pricing</a>
                            </Link>
                        </li>

                        <li>
                            <Link href={'/'}>
                                <a className="hover:text-purple-400">Case Studies</a>
                            </Link>
                        </li>

                        <li>
                            <Link href={'/'}>
                                <a className="uppercase hover:text-purple-400">Faq</a>
                            </Link>
                        </li>

                        {!session?.user ? (
                            <>
                                <li className="gradient-btn">
                                    <Link href={'/auth/signup'}>
                                        <a className="">Try for free</a>
                                    </Link>
                                </li>

                                <li className="disabled-btn">
                                    <Link href={'/auth/signin'}>
                                        <a className="">Login</a>
                                    </Link>
                                </li>
                            </>
                        ) : (
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6 md:mt-3">
                                        <button
                                            type="button"
                                            className="bg-white p-1 rounded-full text-gray-400 hover:text-blue-200">
                                            <span className="sr-only">View notifications</span>
                                            <span className="relative inline-block">
                                                <NoticeCounter delay={120000} />
                                            </span>
                                        </button>

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
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95">
                                                <Menu.Items
                                                    className="origin-top-right absolute right-0 mt-2
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
                                                                window.localStorage.removeItem('user');
                                                                signOut();
                                                            }}>
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
    );
};

export default Header;
