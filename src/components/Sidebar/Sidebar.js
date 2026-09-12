import {
    Equalizer as EqualizerIcon,
    Person as AccountIcon,
    NoteAdd as NoteAddIcon,
} from "@mui/icons-material";
import './Sidebar.css'
import { useSelector } from 'react-redux';
import SidebarLink from '../SidebarLink/SidebarLink'

const Sidebar = () => {
    const menu = [
        { id: 0, label: "Статистика", link: "/dashboard", icon: <EqualizerIcon /> },
        { id: 1, label: "Пользователи", link: "/users", icon: <AccountIcon /> },
        { id: 2, label: "Карточка", link: "/add_user", icon: <NoteAddIcon /> },
    ]
    const isOpenMenu = useSelector(state => state.mainMenu.isOpenMenu)
    return (
        <div className={isOpenMenu ? 'menu' : 'menu menu_close'} >
            {menu.map(link => (
                <SidebarLink
                    key={link.id}
                    isSidebarOpened={true}
                    {...link}
                />
            )
            )}
        </div>
    )
}

export default Sidebar;