import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error('useAuthContext doit etre utilisé dans AuthContextProvider')
    }

    return context
}

export default useAuthContext