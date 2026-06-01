import { createContext, useState } from "react";

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

export default AuthContex