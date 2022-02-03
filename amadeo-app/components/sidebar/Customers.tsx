import React from 'react';
import { useRouter } from 'next/router';
import Brand from './Brand';
import Pages from './Pages';
import { SidebarInventory, SidebarFull, SidebarShipping } from './customers/index';

const SidebarCustomers: React.FC = () => {
    const router = useRouter();

    let CurrentSidebar = SidebarFull;

    if (router.route.startsWith('/shipping')) {
        CurrentSidebar = SidebarShipping;
    }

    if (router.route.startsWith('/inventory')) {
        CurrentSidebar = SidebarInventory;
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

export default SidebarCustomers;
