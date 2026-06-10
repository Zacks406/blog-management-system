import { useContext } from "react";
import AuthContex from "../contex/AuthContex";

function useAuth() {
    return useContext(AuthContex);
}

export default useAuth;