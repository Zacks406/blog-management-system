import { Navigate, Outlet } from 'react-router-dom'

/* function ProtectedRoute({ children }) {

    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to='/Login' />
    };

    return children
}; */

function ProtectedRoute() {

    const token = localStorage.getItem('token');

    return token ?
        <Outlet />
        : <Navigate to="/Login" />
};

export default ProtectedRoute;