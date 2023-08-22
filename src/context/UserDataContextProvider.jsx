import { createContext, useState } from "react";

export const UserDataContext = createContext();

const UserDataContextProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const contextData = { userData, setUserData };
    return (
        <UserDataContext.Provider value={contextData}>
            {children}
        </UserDataContext.Provider>
    );
};
export default UserDataContextProvider;
