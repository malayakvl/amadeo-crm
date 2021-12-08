import Header from '../header/Header';
import React from 'react';
import Footer from '../footer/Footer';

export default function FullLayout({ children }: { children: any }) {
    return (
        <>
            <Header />
            <div className="h-full mt-8 mb-10 md:ml-64">{children}</div>
            <Footer />
        </>
    );
}
