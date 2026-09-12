import './SidebarLink.css'
import {
    Link
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_MAIN_MENU } from '../../services/constants/mainMenu'

const SidebarLink = ({ icon, link, label }) => {
    const mainMenu = useSelector(state => state.mainMenu)
    const dispatch = useDispatch();
    return (

        <Link to={link} className={`link__item 
         ${mainMenu.activePageLink === link && 'link__item_active'}
         ${mainMenu.isOpenMenu ? 'link__item--no-tooltip' : ''}`} data-tooltip={mainMenu.isOpenMenu ? '' : label}
            onClick={(e) => dispatch({ type: UPDATE_MAIN_MENU, payload: { activePageLink: link } })}>
            {icon}
            <p className="link__paragraph">{label}</p>
        </Link>

    )
}

export default SidebarLink;