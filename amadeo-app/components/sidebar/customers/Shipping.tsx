import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../redux/user/selectors';

const SidebarShipping = function () {
    const t = useTranslations();
    const user = useSelector(userSelector);

    return (
        <>
            <li className="go-back" role="presentation">
                <Link href={'/dashboard'}>
                    <a>
                        <span>Go Back</span>
                    </a>
                </Link>
            </li>
            <li className="submenu">
                <Link href={'/shipping/list'}>
                    <a>
                        <i className="text-blue-350 text-base font-bold tracking-wide truncate cursor-pointer" />
                        <span className="s-caption">{t('List')}</span>
                    </a>
                </Link>
            </li>
            <li className="submenu">
                {user.role_id === 3 && (
                    <Link href={'/shipping/add-method'}>
                        <a>
                            <i className="text-blue-350 text-base font-bold tracking-wide truncate cursor-pointer" />
                            <span className="s-caption">{t('Add Method')}</span>
                        </a>
                    </Link>
                )}
            </li>
        </>
    );
};

export default SidebarShipping;
