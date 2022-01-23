import { SidebarCustomer, SidebarBuyer } from '../Sidebar/index';
import SidebarHeader from '../header/SidebarHeader';
import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/user/selectors';
import { isDataLoadingSelector } from '../../redux/layouts/selectors';

export default function SidebarLayout({ children }: { children: any }) {
    const user = useSelector(userSelector);
    const showLoader = useSelector(isDataLoadingSelector);
    return (
        <>
            {showLoader && (
                <div className="loader">
                    <div className="flex justify-center items-center w-full h-full">
                        <div
                            className="spinner-border animate-spin inline-block w-20 h-20 border-4 rounded-full"
                            role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            )}
            {user.role_id === 1 && <SidebarBuyer />}
            {user.role_id === 2 && <SidebarCustomer />}
            <div className="h-full mt-8 mb-10 md:ml-64 md:pl-4 md:mr-8">
                {/*Sideheader*/}
                <SidebarHeader />
                <div className="mt-10">{children}</div>
            </div>
        </>
    );
}
