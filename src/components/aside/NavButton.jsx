import { NavLink } from "react-router-dom";

const NavButton = ({ navigateTo, displayName, icon }) => {
    return (
        <NavLink
            to={navigateTo}
            className="text-secondary flex flex-col space-x-0 p-2 w-full hover:text-primary transition-colors lg:flex-row lg:space-x-4 lg:last:hidden"
        >
            {icon}
            <span className="text-center font-bold text-lg">{displayName}</span>
        </NavLink>
    );
};
export default NavButton;
