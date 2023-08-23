//icon imports.
import CollectionsBookmarkOutlinedIcon from "@mui/icons-material/CollectionsBookmarkOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
//component imports
import CategoryButton from "./CategoryButton";
import FilteredAndSortedItems from "./FilteredAndSortedItems";
import { useState } from "react";

const categoryDisplayNameArr = ["Playlist", "Artists", "Albums"];

const LibraryPanel = () => {
    const [selectedCategory, setSelectedCategory] = useState("Playlist");
    console.log(selectedCategory);

    return (
        <div className="bg-base hidden rounded-lg grow p-2 space-y-6 lg:block overflow-hidden">
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
                        setSelectedCategory={setSelectedCategory}
                        selectedCategory={selectedCategory}
                    />
                ))}
            </div>
            <FilteredAndSortedItems />
        </div>
    );
};
export default LibraryPanel;
