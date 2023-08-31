//icon imports.
import CollectionsBookmarkOutlinedIcon from "@mui/icons-material/CollectionsBookmarkOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
//component imports
import CategoryButton from "./CategoryButton";
import FilteredAndSortedItems from "./FilteredAndSortedItems";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import fetchFunctions from "../../utils/api";

const categoryDisplayNameArr = ["Playlist", "Artists", "Albums"];

const LibraryPanel = () => {
    const [selectedCategory, setSelectedCategory] = useState("Playlist");
    const { isLoading, data, fetchOnClick } = useFetch([
        fetchFunctions.getCurrentUserPlaylist,
    ]);

    //data is an array of responses from fetch requests made.
    const [asidePanelData] = data;

    //handle click from category buttons
    const handleClick = displayName => {
        if (displayName === selectedCategory) return;
        switch (displayName) {
            case "Artists": {
                setSelectedCategory(displayName);
                fetchOnClick([fetchFunctions.getCurrentUserArtists]);
                break;
            }
            case "Albums": {
                setSelectedCategory(displayName);
                fetchOnClick([fetchFunctions.getCurrentUserAlbums]);
                break;
            }
            default: {
                setSelectedCategory(displayName);
                fetchOnClick([fetchFunctions.getCurrentUserPlaylist]);
            }
        }
    };
    return (
        <div className="bg-base hidden rounded-lg h-full p-2 space-y-6 lg:block overflow-hidden">
            <div className="flex justify-between">
                <div className="space-x-4 text-secondary hover:text-primary  hover:cursor-pointer">
                    <CollectionsBookmarkOutlinedIcon />
                    <span className="font-bold text-lg">Your Library</span>
                </div>
                <AddOutlinedIcon className="text-secondary hover:text-primary hover:cursor-pointer" />
            </div>
            <div className="flex space-x-3">
                {categoryDisplayNameArr.map(categoryDisplayName => (
                    <CategoryButton
                        displayName={categoryDisplayName}
                        key={categoryDisplayName}
                        handleClick={handleClick}
                        selectedCategory={selectedCategory}
                    />
                ))}
            </div>
            <FilteredAndSortedItems
                data={asidePanelData}
                isLoading={isLoading}
            />
        </div>
    );
};
export default LibraryPanel;
