import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Brand from './Brand';
import Pages from './Pages';

const SidebarBuyer: React.FC = () => {
    const t = useTranslations();

    return (
        <>
            <div className="sidebar">
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
            </div>
        </>
    );
};

export default SidebarBuyer;
