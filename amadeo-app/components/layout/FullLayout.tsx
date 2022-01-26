import Header from '../header/Header';
import React from 'react';
import Footer from '../footer/Footer';
import { useSelector } from 'react-redux';
import { isDataLoadingSelector } from '../../redux/layouts/selectors';

export default function FullLayout({ children }: { children: any }) {
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
            <Header />
            <div className="min-h-[776px] bg-gray-150 text-black dark:text-white">{children}</div>
            <Footer />
        </>
    );
}
