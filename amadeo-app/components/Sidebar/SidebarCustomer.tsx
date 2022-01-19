import React from 'react';
import Brand from './Brand';
import Pages from './Pages';
import { useRouter } from 'next/router';
import SidebarInventory from './submenu/Inventory';
import SidebarFull from './SidebarFull';
import { useTranslations } from 'next-intl';

const SidebarCustomer: React.FC = () => {
    const router = useRouter();
    const t = useTranslations();

    return (
        <>
            <div className="sidebar">
                <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
                    <ul>
                        <Brand/>
                        {router.route === '/inventory' && <SidebarInventory />}
                        {router.route !== '/inventory' && <SidebarFull />}
                    </ul>
                    <Pages />
                </div>
            </div>
        </>
    );
};

export default SidebarCustomer;
