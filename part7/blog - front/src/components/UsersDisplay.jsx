import { useSelector } from "react-redux";
import { Table } from 'react-bootstrap'
import { Link } from "react-router-dom";

const UsersDisplay = () => {
    const users = useSelector(state => state.users.slice().sort((a, b) => b.blogs.length - a.blogs.length))
    return (
        <div>
            <h2>Users</h2>
            <Table striped>
                <tbody>
                    <tr>
                        <td>{ }</td>
                        <td><h5>blogs created</h5></td>
                    </tr>
                    {users.map(user =>
                        <tr key={user.id}>
                            <td>
                                <Link to={`/users/${user.id}`}>
                                    {user.username}
                                </Link>
                            </td>
                            <td>
                                {user.blogs.length}
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div >
    );
}

export default UsersDisplay;