//icon imports.
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CollectionsBookmarkOutlinedIcon from "@mui/icons-material/CollectionsBookmarkOutlined";
//component imports.
import NavButton from "./NavButton";

const NavigationPanel = () => {
    return (
        <nav className="bg-base rounded-lg flex h-full justify-around items-center lg:flex-col lg:h-1/6 lg:pl-4">
            <NavButton
                navigateTo="/"
                displayName="Home"
                icon={<HomeOutlinedIcon className="m-auto lg:m-0" />}
            />
            <NavButton
                navigateTo="/search"
                displayName="Search"
                icon={<SearchOutlinedIcon className="m-auto lg:m-0" />}
            />
            <NavButton
                navigateTo="/library"
                displayName="Library"
                icon={
                    <CollectionsBookmarkOutlinedIcon className="m-auto lg:m-0" />
                }
            />
        </nav>
    );
};
export default NavigationPanel;
