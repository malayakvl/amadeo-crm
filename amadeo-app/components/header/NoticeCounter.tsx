import React, { useState } from 'react';
import useInterval from '@use-it/interval';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../redux/user/selectors';
import { fetchCntNewAction, fetchNewListAction } from '../../redux/notifications';
import { cntNewSelector, latestNoticeSelector } from '../../redux/notifications/selectors';
import { CogIcon, UserIcon, XIcon } from '@heroicons/react/solid';
import { useTranslations } from 'next-intl';
import moment from 'moment';
import Image from 'next/image';

const NoticeCounter = ({ delay = 1000 }) => {
    const dispatch = useDispatch();
    const user = useSelector(userSelector);
    const noticeCnt = useSelector(cntNewSelector);
    const latestNotice = useSelector(latestNoticeSelector);
    const [showLatest, setShowLatest] = useState(false);
    const t = useTranslations();

    useInterval(() => {
        dispatch(fetchCntNewAction(user.email));
        dispatch(fetchNewListAction(user.email));
    }, delay);

    return (
        <>
            <Image
                className=""
                src="/images/bell.svg"
                width={16}
                height={20}
                layout="fixed"
                alt=""
                role="presentation"
                onClick={() => setShowLatest(!showLatest)}
            />
            {noticeCnt > 0 && (
                <span
                    className="absolute top-0 right-0 inline-flex items-center justify-center
                        px-2 py-1 text-xs font-bold leading-none
                        text-red-100 transform translate-x-1/2 -translate-y-1/2
                        bg-red-500 rounded-full">
                    {noticeCnt}
                </span>
            )}
            {showLatest && noticeCnt > 0 && (
                <div className="absolute z-10 right-0 overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700 w-245 p-4 bg-white rounded">
                    {latestNotice.map((notice: Notifications.Notification) => (
                        <div
                            key={notice.id}
                            className="w-full bg-white flex flex-shrink-0 relative mb-7">
                            <div className="w-6 h-6 border rounded-full border-gray-200 flex flex-shrink-0 items-center justify-center">
                                {notice.type === 'system' && <CogIcon width={12} height={12} />}
                                {notice.type !== 'system' && <UserIcon width={12} height={12} />}
                            </div>
                            <div className="pl-3 pr-4 w-full text-left">
                                <div className="flex items-center justify-between w-full">
                                    <p className="text-sm leading-none">
                                        <span className="text-green-notice">{notice.subject}</span>
                                        <span className="text-gray-notice">{t(notice.type)}</span>
                                        <span className="text-m-notice">
                                            Payed invoice QQ-7894d
                                        </span>
                                    </p>
                                </div>
                                <p className="text-xs leading-3 pt-1 text-gray-500">
                                    {moment(notice.created_at).format('dd.mm.YYYY')}
                                </p>
                            </div>
                            <div className="cursor-pointer absolute top-3 right-3">
                                <XIcon width={12} height={12} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default NoticeCounter;

export const getStaticProps = () => {
    return {
        paths: [
            // if no `locale` is provided only the defaultLocale will be generated
            { params: { slug: 'post-1' }, locale: 'en-US' },
            { params: { slug: 'post-1' }, locale: 'fr' }
        ],
        fallback: true
    };
};
