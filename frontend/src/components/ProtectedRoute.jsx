import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react';
import AuthContex from '../contex/AuthContex';
import { AuthProvider } from '../contex/AuthContex';

/* function ProtectedRoute({ children }) {

    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to='/Login' />
    };

    return children
}; */

function ProtectedRoute() {

    //const token = localStorage.getItem('token');
    const { token } = useContext(AuthContex)

    return token ?
        <Outlet />
        : <Navigate to="/Login" />
};

export default ProtectedRoute;