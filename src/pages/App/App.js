import {
    Route,
    Routes
} from "react-router-dom";
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/600.css';
import '@fontsource/roboto/700.css';
import {
    Dialog,
    Snackbar,
    Alert
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { closePopup } from "../../services/actions/popupData";
import { CLOSE_SNACK } from '../../services/constants/snack'
import './App.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import Header from "../../components/Header/Header";
import Users from '../Users/Users'
import Profile from '../Profile/Profile'


function App() {
    const dispatch = useDispatch()
    const { isOpenPopup, component: Component, props } = useSelector(state => state.popup)
    const snackData = useSelector(state => state.snack)

    const handleClose = () => dispatch(closePopup());
    return (
        <div className="app">
            <Header />
            <div className="app__container">
                <Sidebar />
                <Routes>
                    <Route path="/dashboard" element={<></>} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/add_user" element={<Profile />} />
                    <Route path="/users/:userId" element={<Profile />} />
                </Routes>
            </div>
            <Dialog
                open={isOpenPopup}
                onClose={handleClose}
                maxWidth={props?.maxWidth ?? "sm"}
                fullWidth
            >
                {Component ? (
                    <Component
                        {...props}
                        onClose={handleClose}   // всегда добавляем onClose, чтобы внутри можно было закрыть
                    />
                ) : null}
            </Dialog>
            <Snackbar
                open={snackData.isOpen}
                autoHideDuration={2500}
                onClose={() => dispatch({ type: CLOSE_SNACK })}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert severity={snackData.sev} variant="filled">{snackData.msg}</Alert>
            </Snackbar>
        </div>
    );
}

export default App;
