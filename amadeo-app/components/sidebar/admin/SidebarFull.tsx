import React, { Fragment } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const SidebarFull: React.FC = () => {
    const t = useTranslations();
    return (
        <Fragment>
            <li className="active">
                <Link href={'/dashboard'}>
                    <a>
                        <i className="dashboard" />
                        <span className="s-caption">{t('Dashboard')}</span>
                    </a>
                </Link>
            </li>
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
                <Link href={'/sellers'}>
                    <a>
                        <i className="buyers" />
                        <span className="s-caption">{t('Sellers')}</span>
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
            <li>
                <Link href={'/shipping/list'}>
                    <a>
                        <i className="shipping" />
                        <span className="s-caption">{t('Shipping')}</span>
                        <em>10</em>
                    </a>
                </Link>
            </li>
            {/*<li>*/}
            {/*    <Link href={'/buyers'}>*/}
            {/*        <a>*/}
            {/*            <i className="buyers" />*/}
            {/*            <span className="s-caption">{t('Buyers')}</span>*/}
            {/*        </a>*/}
            {/*    </Link>*/}
            {/*</li>*/}
            <li>
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
            {/*<li>*/}
            {/*    <Link href={'/support'}>*/}
            {/*        <a>*/}
            {/*            <i className="support" />*/}
            {/*            <span className="s-caption">{t('Support')}</span>*/}
            {/*        </a>*/}
            {/*    </Link>*/}
            {/*</li>*/}
        </Fragment>
    );
};

export default SidebarFull;
