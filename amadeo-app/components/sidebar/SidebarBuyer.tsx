import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Brand from './Brand';
import Pages from './Pages';
import { useDispatch, useSelector } from 'react-redux';
import { isSidebarOpenSelector } from '../../redux/layouts/selectors';
import { useWindowSize } from '../../hooks';
import { sidebarCloseAction, toggleSidebarAction } from '../../redux/layouts';

const SidebarBuyer: React.FC = () => {
    const t = useTranslations();
    const isSidebarOpen = useSelector(isSidebarOpenSelector);
    const dispatch = useDispatch();
    const node = useRef<HTMLDivElement>(null);
    const { isMobile } = useWindowSize();

    const handleClick = (e: any) => {
        if (node?.current?.contains(e.target) || node?.current === null) {
            return;
        }
        if (isMobile) {
            dispatch(sidebarCloseAction());
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, []);

    return (
        <>
            <div
                className={`sidebar ${!isSidebarOpen && !isMobile ? 'sb-minimize' : ''} ${
                    isSidebarOpen && isMobile ? 'mobile-open' : ''
                }`}
                ref={node}>
                <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
                    <ul>
                        <Brand />
                        <li className="active">
                            <Link href={'/dashboard'}>
                                <a>
                                    <i className="dashboard" />
                                    <span className="s-caption">Dashboard</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/orders'}>
                                <a>
                                    <i className="order" />
                                    <span className="s-caption">{t('Orders')}</span>
                                </a>
                            </Link>
                        </li>
                    </ul>
                    <Pages />
                </div>
                <div
                    className="sidebar-close-desctop"
                    role="presentation"
                    onClick={() => {
                        dispatch(toggleSidebarAction());
                    }}
                />
            </div>
        </>
    );
};

export default SidebarBuyer;
