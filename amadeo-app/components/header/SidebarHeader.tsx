import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NoticeCounter from './NoticeCounter';
import { fetchCntNewAction, fetchNewListAction } from '../../redux/notifications';
import { useDispatch, useSelector } from 'react-redux';
import { signOut, useSession } from 'next-auth/client';
import { userSelector } from '../../redux/user/selectors';
import { useTranslations } from 'next-intl';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const baseUrl = publicRuntimeConfig.apiUrl;

const userProfileImg =
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

const SidebarHeader: React.FC = () => {
    const t = useTranslations();
    const [session] = useSession();
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [userPhoto, setUserPhoto] = useState(userProfileImg);

    useEffect(
        function () {
            if (session?.user?.email) {
                dispatch(fetchCntNewAction(user.email));
                dispatch(fetchNewListAction(user.email));
            }
        },
        [session]
    );
    useEffect(
        function () {
            console.log('USER', user);
            if (user.photo) {
                setUserPhoto(baseUrl + user.photo);
            }
        },
        [user]
    );

    return (
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
                <NoticeCounter delay={120000} />

                <span className="divider" />
                <div className="relative">
                    <div className="inline-block mt-1">
                        <Image
                            src={userPhoto}
                            width={24}
                            height={24}
                            className="rounded-full cursor-pointer"
                            alt=""
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                        />

                        <span className="profile-name inline-block">
                            {user.first_name} {user.last_name}
                            <em>{user.company_name || t('No Company Name')}</em>
                        </span>
                    </div>
                    {/* Profile dropdown */}
                    <div className={`profile-menu ${!showProfileMenu ? 'hidden' : ''}`}>
                        <div className="corner" />
                        <ul>
                            <li>
                                <Link href={`/account`}>
                                    <a>
                                        <i className="profile" />
                                        <span className="s-caption">{t('Profile')}</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <a>
                                    <i className="plan" />
                                    <span className="s-caption">{t('My Plan')}</span>
                                </a>
                            </li>
                            <li>
                                <Link href={`/notifications`}>
                                    <a>
                                        <i className="bell" />
                                        <span className="s-caption">{t('Notification')}</span>
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <a>
                                    <i className="help" />
                                    <span className="s-caption">{t('Help')}</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`/api/auth/signout`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.localStorage.removeItem('user');
                                        signOut();
                                    }}>
                                    <i className="exit" />
                                    <span className="s-caption">{t('Logout')}</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <span className="divider" />
                <span className="mr-10 mt-1">
                    <a
                        href={`/api/auth/signout`}
                        onClick={(e) => {
                            e.preventDefault();
                            window.localStorage.removeItem('user');
                            signOut();
                        }}>
                        <Image
                            className="mr-5"
                            src="/images/icon-logout.svg"
                            width={14}
                            height={20}
                            alt=""
                        />
                    </a>
                </span>
            </div>
        </div>
    );
};

export default SidebarHeader;
