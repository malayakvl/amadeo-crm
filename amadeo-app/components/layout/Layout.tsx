// import Header from '../header/Header';
import Sidebar from '../layout/Sidebar';
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAction, setUserAction } from '../../redux/user';
import { userSelector } from '../../redux/user/selectors';
import Image from 'next/image';
import { CogIcon, UserIcon } from '@heroicons/react/solid';
import moment from 'moment';

const userProfileImg =
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

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
        <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-150 text-black dark:text-white">
            {/*Header*/}
            {/*Sidebar*/}
            <Sidebar />
            <div className="h-full mt-8 mb-10 md:ml-64">
                {/*Sideheader*/}
                <div className="flex">
                    <div className="w-full sm:w-1/2 md:w-3/5 lg:w-3/5 xl:w-4/5">
                        <form>
                            <div className="relative">
                                <input className="form-control" placeholder="Click to Search" />
                                <i className="input-close" />
                            </div>
                        </form>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-2/5 lg:w-2/5 xl:w-1/5 flex items-center justify-end">
                        <div className="relative">
                            <div className="inline-block mt-1.5">
                                <Image
                                    src="/images/bell.svg"
                                    width={16}
                                    height={20}
                                    layout="fixed"
                                    alt=""
                                    role="presentation"
                                />
                            </div>
                            <span
                                className="absolute top-1.5 right-0.5 inline-flex items-center justify-center
                                px-1.5 py-1.5 text-xs font-bold leading-none
                                red-yellow-gradient transform translate-x-1/2 -translate-y-1/2
                                rounded-full"
                            />
                            <div className="notice-menu hidden">
                                <div className="corner" />
                                <div className="notice-item">
                                    <div className="notice-photo">
                                        <Image src="/images/face.svg" width={24} height={24} />
                                    </div>
                                    <div className="notice-text">
                                        <div className="notice-row">
                                            <div className="text-xs font-bold">
                                                <span className="subject">New payment</span>
                                                <span className="text-gray-350">Liis Ristal</span>
                                                <span className="text-gray-450">
                                                    Payed invoice QQ-7894d
                                                </span>
                                                <span className="text-gray-180">30 mins ago</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="notice-item">
                                    <div className="notice-photo">
                                        <Image src="/images/dog.svg" width={24} height={24} />
                                    </div>
                                    <div className="notice-text">
                                        <div className="notice-row">
                                            <div className="text-xs font-bold">
                                                <span className="subject">New payment</span>
                                                <span className="text-gray-350">Liis Ristal</span>
                                                <span className="text-gray-450">
                                                    Payed invoice QQ-7894d
                                                </span>
                                                <span className="text-gray-180">30 mins ago</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="notice-item">
                                    <div className="notice-photo">
                                        <Image src="/images/dog.svg" width={24} height={24} />
                                    </div>
                                    <div className="notice-text">
                                        <div className="notice-row">
                                            <div className="text-xs font-bold">
                                                <span className="subject">New payment</span>
                                                <span className="text-gray-350">Liis Ristal</span>
                                                <span className="text-gray-450">
                                                    Payed invoice QQ-7894d
                                                </span>
                                                <span className="text-gray-180">30 mins ago</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a href={''} className="view-all">
                                    See all 999 notifications
                                </a>
                            </div>
                        </div>
                        <span className="divider" />
                        <div className="relative">
                            <div className="inline-block mt-1">
                                <Image
                                    src={userProfileImg}
                                    width={24}
                                    height={24}
                                    className="rounded-full"
                                    alt=""
                                />

                                <span className="profile-name inline-block">
                                    Christian Z. Andrew
                                    <em>I Dunno Store, Inc</em>
                                </span>
                            </div>
                            <div className="profile-menu hidden">
                                <div className="corner" />
                                <ul>
                                    <li>
                                        <a>
                                            <i className="profile" />
                                            <span className="s-caption">Profile</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <i className="plan" />
                                            <span className="s-caption">My Plan</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <i className="bell" />
                                            <span className="s-caption">Notification</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <i className="help" />
                                            <span className="s-caption">Help</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a>
                                            <i className="exit" />
                                            <span className="s-caption">Logout</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <span className="divider" />
                        <span className="mr-5 mt-1">
                            <Image
                                className="mr-5"
                                src="/images/icon-logout.svg"
                                width={14}
                                height={20}
                                alt=""
                            />
                        </span>
                    </div>
                </div>
                {/*<SideHeader />*/}
                {children}
            </div>
        </div>
    );
}
