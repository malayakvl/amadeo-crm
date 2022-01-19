import React from 'react';
import Brand from './Brand';
import Pages from './Pages';
import { useRouter } from 'next/router';
import SidebarShipping from './submenu/Shipping'
import SidebarInventory from './submenu/Inventory';
import SidebarFull from './SidebarFull';

const SidebarCustomer: React.FC = () => {
    const router = useRouter();

    let CurrentSidebar = SidebarFull

    if (router.route.startsWith('/shipping')) {
        CurrentSidebar = SidebarShipping
        
    }

    if (router.route.startsWith('/inventory')) {
        CurrentSidebar = SidebarInventory

    }

    return (
        <>
            <div className="sidebar">
                <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
                    <ul>
                        <Brand />
                        <CurrentSidebar />
                    </ul>
                    <Pages />
                </div>
            </div>
        </>
    );
};

export default SidebarCustomer;
