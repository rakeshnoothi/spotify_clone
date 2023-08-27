import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserDataContext = createContext();

const UserDataContextProvider = ({ children }) => {
    const {data, }
    const navigate = useNavigate();

    //Handling click from the aside panel category items.
    const handleCategoryItemClick = (itemId,itemType) => {
        if(itemType === "Playlist"){
            navigate("/playlist")
        } 
    }
    const contextData = { userData, setUserData };
    return (
        <UserDataContext.Provider value={contextData}>
            {children}
        </UserDataContext.Provider>
    );
};
export default UserDataContextProvider;
