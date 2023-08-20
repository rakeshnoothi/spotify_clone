import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const Home = () => {
    useEffect(() => {
        axiosInstance
            .get("/v1/me")
            .then((res) => console.log(res))
            .catch((error) => console.log(error));
    });
    return <NavLink to="/profile">home</NavLink>;
};
export default Home;
