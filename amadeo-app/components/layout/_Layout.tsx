import Header from '../header/Header';
import Sidebar from '../layout/Sidebar';
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAction, setUserAction } from '../../redux/user';
import { userSelector } from '../../redux/user/selectors';
import Image from 'next/image';

export default function Layout({ children }: { children: any }) {
    const [session] = useSession();
    const dispatch = useDispatch();
    const user = useSelector(userSelector);

    useEffect(
        function () {
            if (session?.user && !window.localStorage.getItem('user')) {
                dispatch(fetchUserAction(session.user.email));
            } else {
                dispatch(setUserAction(JSON.parse(window.localStorage.getItem('user') || '{}')));
            }
        },
        [dispatch, session?.user]
    );

    useEffect(
        function () {
            if (Object.keys(user).length) {
                const storeUser = window.localStorage.getItem('user')
                    ? JSON.parse(window.localStorage.getItem('user') || '')
                    : {};
                if (storeUser.id !== user.id) {
                    window.localStorage.setItem('user', JSON.stringify(user));
                }
            }
        },
        [dispatch, user]
    );

    return (
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
            {/*Header*/}
            <div className="fixed w-full flex items-center justify-between h-14 text-white z-10"></div>
            {/*Sidebar*/}
            <div className="hidden md:fixed md:flex flex-col top-14 left-0 h-full text-white transition-all duration-300 border-none sidebar">
                <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
                    <ul className="flex flex-col">
                        <li className="mt-4 mb-4">
                            <a className="relative flex flex-row items-center">
                                <span className="inline-flex justify-center items-center ml-4">
                                    <Image
                                        className=""
                                        src="/images/icon-dashboard.svg"
                                        width={18}
                                        height={20}
                                        layout="fixed"
                                        alt=""
                                    />
                                </span>
                                <span className="ml-2 text-xs font-bold tracking-wide truncate">
                                    Dashboard
                                </span>
                            </a>
                        </li>
                        <li className="mt-4 mb-4">
                            <a className="relative flex flex-row items-center">
                                <span className="inline-flex justify-center items-center ml-4">
                                    <Image
                                        className=""
                                        src="/images/icon-selling.svg"
                                        width={18}
                                        height={20}
                                        layout="fixed"
                                        alt=""
                                    />
                                </span>
                                <span className="text-blue-200 ml-2 text-xs font-bold tracking-wide truncate">
                                    Live Selling
                                </span>
                            </a>
                        </li>
                    </ul>
                    <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">
                        Copyright @2021
                    </p>
                </div>
            </div>
            <div className="h-full mt-14 mb-10 md:ml-64">{children}</div>
        </div>

        // <div className="md:flex flex-col md:flex-row md:min-h-screen w-full">
        //     <div className="flex flex-col w-full md:w-64 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0">
        //         <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
        //             <a
        //                 href="#"
        //                 className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">
        //                 Flowtrail UI
        //             </a>
        //             <button className="rounded-lg md:hidden rounded-lg focus:outline-none focus:shadow-outline">
        //                 <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
        //                     <path
        //                         fillRule="evenodd"
        //                         d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
        //                         clipRule="evenodd"></path>
        //                     <path
        //                         fillRule="evenodd"
        //                         d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        //                         clipRule="evenodd"></path>
        //                 </svg>
        //             </button>
        //         </div>
        //         <nav className="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
        //             <a
        //                 className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
        //                 href="#">
        //                 Blog
        //             </a>
        //             <a
        //                 className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
        //                 href="#">
        //                 Portfolio
        //             </a>
        //             <a
        //                 className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
        //                 href="#">
        //                 About
        //             </a>
        //             <a
        //                 className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
        //                 href="#">
        //                 Contact
        //             </a>
        //             <div className="relative" x-data="{ open: false }">
        //                 <button className="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 md:block hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
        //                     <span>Dropdown</span>
        //                     <svg
        //                         fill="currentColor"
        //                         viewBox="0 0 20 20"
        //                         className="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1">
        //                         <path
        //                             fillRule="evenodd"
        //                             d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        //                             clipRule="evenodd"></path>
        //                     </svg>
        //                 </button>
        //                 <div
        //                     x-show="open"
        //                     className="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg">
        //                     <div className="px-2 py-2 bg-white rounded-md shadow dark-mode:bg-gray-800">
        //                         <a
        //                             className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
        //                             href="#">
        //                             Link #1
        //                         </a>
        //                         <a
        //                             className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
        //                             href="#">
        //                             Link #2
        //                         </a>
        //                         <a
        //                             className="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
        //                             href="#">
        //                             Link #3
        //                         </a>
        //                     </div>
        //                 </div>
        //             </div>
        //         </nav>
        //     </div>
        // </div>
    );
}
