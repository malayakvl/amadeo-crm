import Header from '../header/Header';
import React from 'react';
import Footer from '../footer/Footer';

export default function FullLayout({ children }: { children: any }) {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-150 text-black dark:text-white">{children}</div>
            <Footer />
        </>
    );
}
