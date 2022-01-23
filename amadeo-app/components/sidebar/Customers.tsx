import React from 'react';
import { useRouter } from 'next/router';
// import Brand from './Brand';
// import Pages from './Pages';
import { SidebarInventory, SidebarFull } from './customers/index';

const SidebarCustomers: React.FC = () => {
    const router = useRouter();

    return (
        <>
            <div className="sidebar">
                <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
                    <ul>
                        {/*<Brand />*/}
                        {router.route === '/inventory' && <SidebarInventory />}
                        {router.route !== '/inventory' && <SidebarFull />}
                    </ul>
                    {/*<Pages />*/}
                </div>
            </div>
        </>
    );
};

export default SidebarCustomers;
