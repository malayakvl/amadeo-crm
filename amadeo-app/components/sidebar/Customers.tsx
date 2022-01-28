import React from 'react';
import { useRouter } from 'next/router';
import Brand from './Brand';
import Pages from './Pages';
import { SidebarInventory, SidebarFull, SidebarShipping } from './customers/index';

const SidebarCustomers: React.FC = () => {
    const router = useRouter();
    return (
        <>
            <div className="sidebar">
                <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
                    <ul>
                        <Brand />
                        {router.route === '/inventory' && <SidebarInventory />}
                        {router.route === '/shipping/list' && <SidebarShipping />}
                        {router.route === '/shipping/add-method' && <SidebarShipping />}
                        {!['/inventory', '/shipping/list', '/shipping/add-method'].includes(
                            router.route
                        ) && <SidebarFull />}
                    </ul>
                    <Pages />
                </div>
            </div>
        </>
    );
};

export default SidebarCustomers;
