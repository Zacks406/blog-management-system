import { createContext, useEffect, useState } from "react";

const AuthContex = createContext()

export function AuthProvider({ children }) {
    // const [token, setToken] = useState(() => localStorage.getItem("token"))

    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {

        const storedToken = localStorage.getItem("token")

        if (storedToken) {
            setToken(storedToken)
        }

        setLoading(false)
    }, [])

    const login = (newToken, newUser) => {
        localStorage.setItem("token", newToken)
        setToken(newToken)
        setUser(newUser)
    }

    const logout = () => {
        localStorage.removeItem("token")
        setToken(null)
    }

    return (
        < AuthContex.Provider
            value={{
                token,
                setToken,
                login,
                logout,
                user
            }}
        >
            {!loading && children}
        </AuthContex.Provider >
    )
}

export default AuthContex































/* import { createContext, useState } from "react";

const AuthContex = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(localStorage.getItem("token"));

    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken)
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null)
    }

    return (
        <AuthContex.Provider
            value={{
                token,
                setToken,
                login,
                logout
            }}
        >
            {children}
        </AuthContex.Provider>
    )
}

export default AuthContex */


