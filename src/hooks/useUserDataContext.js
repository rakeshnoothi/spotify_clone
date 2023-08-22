import { useContext } from "react";
import { UserDataContext } from "../context/UserDataContextProvider";

const useUserDataContext = () => useContext(UserDataContext);

export default useUserDataContext;
