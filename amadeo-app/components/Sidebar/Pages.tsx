import React from 'react';
import Link from 'next/link';

export default function Pages() {
    return (
        <div className="mb-5 px-5 py-3 hidden md:block text-center text-xs">
            <ul className="nav-footer">
                <li>
                    <Link href={'/pages/price'}>
                        <a>About</a>
                    </Link>
                </li>
                <li>
                    <Link href={'/pages/price'}>
                        <a>Cookies</a>
                    </Link>
                </li>
                <li>
                    <Link href={'/pages/price'}>
                        <a>Privacy</a>
                    </Link>
                </li>
                <li>
                    <Link href={'/pages/price'}>
                        <a>Terms</a>
                    </Link>
                </li>
            </ul>
            <span className="copyright">@ 2021 Liveproshop</span>
        </div>
    );
}
