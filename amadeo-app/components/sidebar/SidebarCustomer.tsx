// import React from 'react';
// import { useRouter } from 'next/router';
// import Brand from './Brand';
// import Pages from './Pages';
// import SidebarFull from "./customers/SidebarFull";
// import SidebarInventory from "./customers/Inventory";
//
// const SidebarCustomer: React.FC = () => {
//     const router = useRouter();
//
//     return (
//         <>
//             <div className="sidebar">
//                 <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
//                     <ul>
//                         <Brand />
//                         {router.route === '/inventory' && <SidebarInventory />}
//                         {router.route !== '/inventory' && <SidebarFull />}
//                     </ul>
//                     <Pages />
//                 </div>
//             </div>
//         </>
//     );
// };
//
// export default SidebarCustomer;
import React from 'react';
import Link from 'next/link';
import Brand from './Brand';
import Pages from './Pages';

const SidebarBuyer: React.FC = () => {
    return (
        <>
            <div className="sidebar">
                <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
                    <ul>
                        <Brand />
                        <li className="active">
                            <Link href={'/dashboard'}>
                                <a>
                                    <i className="dashboard" />
                                    <span className="s-caption">Dashboard</span>
                                </a>
                            </Link>
                        </li>
                    </ul>
                    <Pages />
                </div>
            </div>
        </>
    );
};

export default SidebarBuyer;
