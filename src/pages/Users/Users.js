
import { useSelector } from 'react-redux';
import './Users.css'
import PageTitle from '../../components/PageTitle/PageTitle'
import UserTable from '../../components/UserTable/UserTable'
import { departamentsData } from '../../constantsData'


function Users() {
    const usersData = useSelector(state => state.users)
    return (<main className="main">
        <PageTitle title="Список пользователей" >
            <button
                className="button__title"
                onClick={(e) => { }}
            >
                Создать пользователя
            </button>
        </PageTitle>

        <div className="table__container">
            <UserTable usersData={usersData.map((item) => { return { ...item, department: departamentsData[item.department_id].name } })} />
        </div>


    </main>)
}

export default Users;