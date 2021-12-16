import React from 'react';
import Link from 'next/link';
import Brand from './Brand';
import Pages from './Pages';

const SidebarCustomer: React.FC = () => {
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
                        <li>
                            <Link href={'/'}>
                                <a>
                                    <i className="selling" />
                                    <span className="s-caption">Live Selling</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'}>
                                <a>
                                    <i className="inventory" />
                                    <span className="s-caption">Inventory</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <div className="separator" />
                        </li>
                        <li>
                            <Link href={'/'}>
                                <a>
                                    <i className="order" />
                                    <span className="s-caption">Order</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'}>
                                <a>
                                    <i className="waiting-list" />
                                    <span className="s-caption">Waiting List</span>
                                    <em>9</em>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'}>
                                <a>
                                    <i className="shipping" />
                                    <span className="s-caption">Shipping</span>
                                    <em>10</em>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'}>
                                <a>
                                    <i className="buyers" />
                                    <span className="s-caption">Buyers</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/'}>
                                <a>
                                    <i className="payments" />
                                    <span className="s-caption">Payments</span>
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

export default SidebarCustomer;
