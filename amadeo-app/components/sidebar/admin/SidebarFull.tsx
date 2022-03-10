import React, { Fragment } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

const SidebarFull: React.FC = () => {
    const t = useTranslations();
    const router = useRouter();
    const currRoute = router.route.substring(1);

    return (
        <Fragment>
            <li className={currRoute === 'dashboard' ? 'active' : ''}>
                <Link href={'/dashboard'}>
                    <a>
                        <i className="dashboard" />
                        <span className="s-caption">{t('Dashboard')}</span>
                    </a>
                </Link>
            </li>
            <li className={currRoute === 'chatbot' ? 'active' : ''}>
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
            <li className={currRoute === 'sellers' ? 'active' : ''}>
                <Link href={'/sellers'}>
                    <a>
                        <i className="buyers" />
                        <span className="s-caption">{t('Sellers')}</span>
                    </a>
                </Link>
            </li>
            <li className={currRoute === 'orders' ? 'active' : ''}>
                <Link href={'/orders'}>
                    <a>
                        <i className="order" />
                        <span className="s-caption">{t('Orders')}</span>
                    </a>
                </Link>
            </li>
            <li>
                <Link href={'/shipping/list'}>
                    <a>
                        <i className="shipping" />
                        <span className="s-caption">{t('Shipping')}</span>
                        <em>10</em>
                    </a>
                </Link>
            </li>
            <li className={currRoute === 'payments' ? 'active' : ''}>
                <Link href={'/payments'}>
                    <a>
                        <i className="payments" />
                        <span className="s-caption">{t('Payments')}</span>
                    </a>
                </Link>
            </li>
            <li>
                <Link href={'/buyers'}>
                    <a>
                        <i className="buyers" />
                        <span className="s-caption">{t('Buyers')}</span>
                    </a>
                </Link>
            </li>
        </Fragment>
    );
};

export default SidebarFull;
