import {
    Route,
    Routes
} from "react-router-dom";
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/600.css';
import '@fontsource/roboto/700.css';
import {
    Dialog
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_POPUP } from '../../services/constants/popupData'
import './App.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import Header from "../../components/Header/Header";
import Users from '../Users/Users'


function App() {
    const dispatch = useDispatch()
    const popupData = useSelector(state => state.popup)
    return (
        <div className="app">
            <Header />
            <div className="app__container">
                <Sidebar />
                <Routes>
                    <Route path="/dashboard" element={<></>} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/add_user" element={<></>} />
                </Routes>
            </div>
            <Dialog
                open={popupData.isOpenPopup}
                onClose={(e) => dispatch({ type: CLOSE_POPUP })}
                maxWidth="sm"
                fullWidth
            >
                {popupData.componentPopup}
            </Dialog>
        </div>
    );
}

export default App;
