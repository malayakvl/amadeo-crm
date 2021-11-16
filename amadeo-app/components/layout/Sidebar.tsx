import SidebarRow from "./SidebarRow";
import {
    // ChevronDownIcon,
    ShoppingBagIcon,
    UserGroupIcon
} from '@heroicons/react/solid'
import {
    // CalendarIcon,
    // ClockIcon,
    // DesktopComputerIcon,
    UsersIcon
} from "@heroicons/react/outline";

interface Props {
    user: {
        name: string,
        email: string,
        image: string
    };
}

const Sidebar: React.FC<Props> = ({ user } ) => {
// export default function Sidebar({session}) {

    return (
        <div className="p-2 mt-5 max-w-[600px] xl:min-w-[300px]">
            {user && <SidebarRow src={user?.image} Icon="" title={user?.name} />}
            <SidebarRow src="" Icon={UsersIcon} title="Friends" />
            <SidebarRow src="" Icon={ShoppingBagIcon} title="Friends" />
        </div>
    )
}

export default Sidebar;


