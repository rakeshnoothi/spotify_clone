import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";

const useAuthContext = () => {
    return useContext(AuthContext);
};

export default useAuthContext;
