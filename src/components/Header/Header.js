
import {
    AppBar,
    Toolbar,
} from "@mui/material";
import {
    Menu as MenuIcon,
    ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import classNames from "classnames";
import useStyles from "./styles";
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_MAIN_MENU } from '../../services/constants/mainMenu'




export default function Header() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isOpenMenu = useSelector(state => state.mainMenu.isOpenMenu);
    return (
        <AppBar
            position="static"
            className={classes.appBar}
            sx={{ backgroundColor: "#95A0B2" }}
        >
            <Toolbar className={classes.toolbar}>
                {isOpenMenu ? (
                    <ArrowBackIcon
                        onClick={(e) => dispatch({ type: UPDATE_MAIN_MENU, payload: { isOpenMenu: !isOpenMenu } })}
                        classes={{
                            root: classNames(
                                classes.headerIcon,
                                classes.headerIconCollapse,
                            ),
                        }}
                    />
                ) : (
                    <MenuIcon
                        onClick={(e) => dispatch({ type: UPDATE_MAIN_MENU, payload: { isOpenMenu: !isOpenMenu } })}
                        classes={{
                            root: classNames(
                                classes.headerIcon,
                                classes.headerIconCollapse,
                            ),
                        }}
                    />
                )}

                <h2
                    variant="h6"
                    weight="medium"
                    className={classes.logotype}
                >
                    Управление пользователями
                </h2>



            </Toolbar>
        </AppBar>
    );
}