import {
    Route,
    Routes
} from "react-router-dom";
import Sidebar from '../../components/Sidebar/Sidebar'
import Header from "../../components/Header/Header";

function App() {
    return (
        <div>
            <Header />
            <Sidebar />
            <Routes>
                <Route path="/dashboard" component={<></>} />
                <Route path="/users" component={<></>} />
                <Route path="/add_user" component={<></>} />
            </Routes>
        </div>
    );
}

export default App;
