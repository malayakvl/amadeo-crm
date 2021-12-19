import React from 'react';
import Link from 'next/link';
import Brand from './Brand';
import Pages from './Pages';
import { useTranslations } from 'next-intl';

const SidebarCustomer: React.FC = () => {
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
                                    <span className="s-caption">{t('Dashboard')}</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'}>
                                <a>
                                    <i className="selling" />
                                    <span className="s-caption">{t('Live Selling')}</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/inventory'}>
                                <a>
                                    <i className="inventory" />
                                    <span className="s-caption">{t('Inventory')}</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <div className="separator" />
                        </li>
                        <li>
                            <Link href={'/'}>
                                <a>
                                    <i className="order" />
                                    <span className="s-caption">{t('Order')}</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'}>
                                <a>
                                    <i className="waiting-list" />
                                    <span className="s-caption">{t('Waiting List')}</span>
                                    <em>9</em>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'}>
                                <a>
                                    <i className="shipping" />
                                    <span className="s-caption">{t('Shipping')}</span>
                                    <em>10</em>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'}>
                                <a>
                                    <i className="buyers" />
                                    <span className="s-caption">{t('Buyers')}</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'}>
                                <a>
                                    <i className="payments" />
                                    <span className="s-caption">{t('Payments')}</span>
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

export default SidebarCustomer;
