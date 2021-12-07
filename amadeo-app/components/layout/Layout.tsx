// import Header from '../header/Header';
import Sidebar from '../layout/Sidebar';
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/client';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAction, setUserAction } from '../../redux/user';
import { userSelector } from '../../redux/user/selectors';
import Image from 'next/image';

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
                    <div className="w-full sm:w-1/2 md:w-2/3 lg:w-4/5">
                        <form>
                            <div className="relative">
                                <input className="form-control" placeholder="Click to Search" />
                                <i className="input-close" />
                            </div>
                        </form>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 flex items-center justify-end">
                        <Image
                            className="ml-12 mt-10 mr-10"
                            src="/images/bell.svg"
                            width={16}
                            height={20}
                            layout="fixed"
                            alt=""
                            role="presentation"
                        />
                        <span className="divider" />
                        <Image
                            src={userProfileImg}
                            width={24}
                            height={24}
                            className="rounded-full"
                            alt=""
                        />
                        <span className="profile-name">
                            Christian Z. Andrew
                            <em>I Dunno Store, Inc</em>
                        </span>
                        <span className="divider" />
                        <span className="mr-5">
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
