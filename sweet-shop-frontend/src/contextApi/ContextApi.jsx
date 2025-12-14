import { createContext, useContext, useState } from "react";

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
    const getToken = localStorage.getItem("JWT_TOKEN")
        ? JSON.parse(localStorage.getItem("JWT_TOKEN"))
        : null;
    
    const getRole = localStorage.getItem("USER_ROLE")
        ? JSON.parse(localStorage.getItem("USER_ROLE"))
        : null;

    const [token, setToken] = useState(getToken);
    const [userRole, setUserRole] = useState(getRole);

    const isAdmin = userRole === "ROLE_ADMIN";

    const logout = () => {
        setToken(null);
        setUserRole(null);
        localStorage.removeItem("JWT_TOKEN");
        localStorage.removeItem("USER_ROLE");
    };

    const sendData = {
        token,
        setToken,
        userRole,
        setUserRole,
        isAdmin,
        logout,
    };

    return <ContextApi.Provider value={sendData}>{children}</ContextApi.Provider>
};


export const useStoreContext = () => {
    const context = useContext(ContextApi);
    return context;
}