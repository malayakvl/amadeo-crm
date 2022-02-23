import React, { Fragment } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { itemsCountSelector } from '../../../redux/waitingList/selectors';
import { useSelector } from 'react-redux';

const SidebarFull: React.FC = () => {
    const t = useTranslations();
    const countWaiting = useSelector(itemsCountSelector);
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
                <Link href={'/liveselling'}>
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
                <Link href={'/orders'}>
                    <a>
                        <i className="order" />
                        <span className="s-caption">{t('Order')}</span>
                    </a>
                </Link>
            </li>
            <li>
                <Link href={'/waiting-list'}>
                    <a>
                        <i className="waiting-list" />
                        <span className="s-caption">{t('Waiting List')}</span>
                        {countWaiting > 0 && <em>{countWaiting}</em>}
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
            <li>
                <Link href={'/buyers'}>
                    <a>
                        <i className="buyers" />
                        <span className="s-caption">{t('Buyers')}</span>
                    </a>
                </Link>
            </li>
            <li>
                <Link href={'/payments'}>
                    <a>
                        <i className="payments" />
                        <span className="s-caption">{t('Payments')}</span>
                    </a>
                </Link>
            </li>
            <li>
                <Link href={'/support'}>
                    <a>
                        <i className="support" />
                        <span className="s-caption">{t('Support')}</span>
                    </a>
                </Link>
            </li>
        </Fragment>
    );
};

export default SidebarFull;
