import React from 'react';
import Link from 'next/link';
import moment from 'moment';

export default function Pages() {
    return (
        <div className="mb-5 px-5 py-3 text-center text-xs">
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
                    <Link href={'/pages/privacy'}>
                        <a>Privacy</a>
                    </Link>
                </li>
                <li>
                    <a
                        href="https://www.liveproshop.com/terms-and-conditions"
                        target="_blank"
                        rel="noreferrer">
                        Terms
                    </a>
                </li>
            </ul>
            <span className="copyright">@ {moment().format('YYYY')} Liveproshop</span>
        </div>
    );
}
