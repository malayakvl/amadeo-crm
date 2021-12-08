import React, { useState } from 'react';
import useInterval from '@use-it/interval';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../redux/user/selectors';
import { fetchCntNewAction, fetchNewListAction } from '../../redux/notifications';
import { cntNewSelector, latestNoticeSelector } from '../../redux/notifications/selectors';
import { CogIcon } from '@heroicons/react/solid';
import { useTranslations } from 'next-intl';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

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
        <div className="relative">
            <div className={`inline-block mt-1.5 ${noticeCnt > 0 ? 'cursor-pointer' : ''}`}>
                <Image
                    src="/images/bell.svg"
                    width={16}
                    height={20}
                    layout="fixed"
                    alt=""
                    role="presentation"
                    onClick={() => setShowLatest(!showLatest)}
                />
            </div>
            {noticeCnt > 0 && <span className="counter" />}
            {showLatest && noticeCnt > 0 && (
                <div className="notice-menu">
                    <div className="corner" />
                    {latestNotice.map((notice: Notifications.Notification) => (
                        <div key={notice.id} className="notice-item">
                            <div className="notice-photo">
                                {notice.type === 'system' && (
                                    <CogIcon
                                        className="border rounded-full"
                                        width={24}
                                        height={24}
                                    />
                                )}
                                {notice.type !== 'system' && (
                                    <Image src="/images/face.svg" width={24} height={24} />
                                )}
                            </div>
                            <div className="notice-text">
                                <div className="notice-row">
                                    <div className="text-xs font-bold">
                                        <span className="subject">{notice.subject}</span>
                                        <span className="text-gray-350">Liis Ristal</span>
                                        <span className="text-gray-450">{notice.message}</span>
                                        <span className="text-gray-180">
                                            {moment(notice.created_at).format('dd.mm.YYYY')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <Link href={'/notifications'}>
                        <a className="view-all m-auto block text-center">
                            {t('See all 999 notifications')}
                        </a>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default NoticeCounter;
