import React from 'react';

const Sidebar: React.FC = () => {
    return (
        <>
            <div className="sidebar">
                <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
                    <ul>
                        <li>
                            <a className="brand" />
                        </li>
                        <li className="active">
                            <a>
                                <i className="dashboard" />
                                <span className="s-caption">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a>
                                <i className="selling" />
                                <span className="s-caption">Live Selling</span>
                            </a>
                        </li>
                        <li>
                            <a>
                                <i className="inventory" />
                                <span className="s-caption">Inventory</span>
                            </a>
                        </li>
                        <li>
                            <div className="separator" />
                        </li>
                        <li>
                            <a>
                                <i className="order" />
                                <span className="s-caption">Order</span>
                            </a>
                        </li>
                        <li>
                            <a>
                                <i className="waiting-list" />
                                <span className="s-caption">Waiting List</span>
                                <em>9</em>
                            </a>
                        </li>
                        <li>
                            <a>
                                <i className="shipping" />
                                <span className="s-caption">Shipping</span>
                                <em>10</em>
                            </a>
                        </li>
                        <li>
                            <a>
                                <i className="buyers" />
                                <span className="s-caption">Buyers</span>
                            </a>
                        </li>
                        <li>
                            <a>
                                <i className="payments" />
                                <span className="s-caption">Payments</span>
                            </a>
                        </li>
                    </ul>
                    <p className="mb-5 px-5 py-3 hidden md:block text-center text-xs">
                        <ul className="nav-footer">
                            <li>
                                <a href="">About</a>
                            </li>
                            <li>
                                <a href="">Cookies</a>
                            </li>
                            <li>
                                <a href="">Privacy</a>
                            </li>
                            <li>
                                <a href="">Terms</a>
                            </li>
                        </ul>
                        <span className="copyright">@ 2021 Liveproshop</span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
