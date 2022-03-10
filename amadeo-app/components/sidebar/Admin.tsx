import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Brand from './Brand';
import Pages from './Pages';
import { SidebarFull, SidebarShipping } from './admin/index';
import { useWindowSize } from '../../hooks';
import { sidebarCloseAction } from '../../redux/layouts';
import { useDispatch, useSelector } from 'react-redux';
import { isSidebarOpenSelector } from '../../redux/layouts/selectors';

const SidebarCustomers: React.FC = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const isSidebarOpen = useSelector(isSidebarOpenSelector);
    const node = useRef<HTMLDivElement>(null);
    const { isMobile } = useWindowSize();

    let CurrentSidebar = SidebarFull;

    if (router.route.startsWith('/shipping')) {
        CurrentSidebar = SidebarShipping;
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, []);

    const handleClick = (e: any) => {
        if (node?.current?.contains(e.target) || node?.current === null) {
            return;
        }
        dispatch(sidebarCloseAction());
    };

    return (
        <>
            <div className={`sidebar ${isSidebarOpen && isMobile ? 'mobile-open' : ''}`} ref={node}>
                <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
                    <ul>
                        <Brand />
                        <CurrentSidebar />
                    </ul>
                    <Pages />
                </div>
            </div>
        </>
    );
};

export default SidebarCustomers;
