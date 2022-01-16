import React, { Fragment } from 'react';
import Link from 'next/link';
import Brand from './Brand';
import Pages from './Pages';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';

const SidebarCustomer: React.FC = () => {
    const t = useTranslations();
    const router = useRouter();
    console.log(router.route);

    return (
        <>
            <div className="sidebar">
                <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
                    <ul>
                        <Brand />
                        {router.route !== '/dashboard' && (
                            <li className="go-back">
                                <Link href={'/dashboard'}>
                                    <a>
                                        <span>Go Back</span>
                                    </a>
                                </Link>
                            </li>
                        )}
                        <li>
                            <div className="separator" />
                        </li>
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
                        {router.route !== '/inventory' && (
                            <li>
                                <Link href={'/inventory'}>
                                    <a>
                                        <i className="inventory" />
                                        <span className="s-caption">{t('Inventory')}</span>
                                    </a>
                                </Link>
                            </li>
                        )}
                        {router.route === '/inventory' && (
                            <Fragment>
                                <li className="submenu">
                                    <Link href={'/inventory'}>
                                        <a>
                                            <span className="s-caption">{t('Inventory')}</span>
                                        </a>
                                    </Link>
                                </li>
                                <li className="submenu">
                                    <Link href={'/inventory'}>
                                        <a>
                                            <span className="s-caption">{t('Add Product')}</span>
                                        </a>
                                    </Link>
                                </li>
                            </Fragment>
                        )}
                        <li>
                            <Link href={'/chatbot'}>
                                <a>
                                    <i className="chatbot" />
                                    <span className="s-caption">{t('Chatbot')}</span>
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
