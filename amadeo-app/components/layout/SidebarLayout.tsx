import SidebarCustomer from '../Sidebar/SidebarCustomer';
import SidebarBuyer from '../Sidebar/SidebarBuyer';
import SidebarHeader from '../header/SidebarHeader';
import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/user/selectors';

export default function SidebarLayout({ children }: { children: any }) {
    const user = useSelector(userSelector);
    return (
        <>
            {user.role_id === 1 && <SidebarBuyer />}
            {user.role_id === 2 && <SidebarCustomer />}
            <div className="h-full mt-8 mb-10 md:ml-64 md:pl-4 md:mr-8">
                {/*Sideheader*/}
                <SidebarHeader />
                {children}
            </div>
        </>
    );
}
