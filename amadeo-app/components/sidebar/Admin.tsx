import React from 'react';
import { useRouter } from 'next/router';
import Brand from './Brand';
import Pages from './Pages';
import { SidebarFull, SidebarShipping } from './admin/index';

const SidebarCustomers: React.FC = () => {
    const router = useRouter();

    let CurrentSidebar = SidebarFull;

    if (router.route.startsWith('/shipping')) {
        CurrentSidebar = SidebarShipping;
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
