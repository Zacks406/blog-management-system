import { useContext } from "react"
import { AuthProvider } from "../contex/AuthContex"
import AuthContex from "../contex/AuthContex"
import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom"


function AdminRoute() {
    const {user} = useContext(AuthContex)
    console.log(user.role)

    return (
        user?.role == "admin" ?
            <Outlet /> :
            <Navigate to="/Dashboard" />
    )


}

export default AdminRoute