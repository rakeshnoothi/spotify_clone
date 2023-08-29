import { useState } from "react";
import CategoryItem from "./CategoryItem";
import FilterAndSort from "./FilterAndSort";

const FilteredAndSortedItems = ({ data, isLoading }) => {
    const [inputValue, setInputValue] = useState("");
    const returnFormattedData = data => {
        if (data === null) return <div>No data available</div>;

        let itemsDataArr = [];

        if (data.artists?.items.length >= 1) {
            itemsDataArr = data.artists.items.map(item => ({
                image: item.images[0]?.url,
                id: item.id,
                owner: null,
                name: item.name,
                type: item.type,
            }));
        } else if (data.items && data.items[0]?.album !== undefined) {
            itemsDataArr = data.items.map(item => ({
                image: item.album.images[0]?.url,
                id: item.album.id,
                owner: item.album.artists[0]?.name,
                name: item.album.name,
                type: item.album.type,
            }));
        } else if (data.items) {
            itemsDataArr = data.items.map(item => ({
                image: item.images[0]?.url,
                id: item.id,
                owner: item.owner?.display_name,
                name: item.name,
                type: item.type,
            }));
        }

        // return itemsDataArr.length > 0 ? (
        //     itemsDataArr.map(itemData => (
        //         <CategoryItem itemData={itemData} key={itemData.id} />
        //     ))
        // ) : (
        //     <div>No data available</div>
        // );
        return itemsDataArr.length > 0 ? (
            itemsDataArr.map(itemData => {
                //return items that are only matched with the value of variable inputValue coming from the filterAndSort component.
                if (
                    //transform itemData.name and inputvalue to upperCase or lower case and split when there are white spaces
                    //and join them again without white spaces to make it case insensitive and white space insensitive.
                    itemData.name
                        .toUpperCase()
                        .split(" ")
                        .join("")
                        .includes(inputValue.toUpperCase().split(" ").join(""))
                )
                    return (
                        <CategoryItem itemData={itemData} key={itemData.id} />
                    );

                //if it is empty string return all the category items in the itemsDataArr..
                if (inputValue === "") {
                    return (
                        <CategoryItem itemData={itemData} key={itemData.id} />
                    );
                }
            })
        ) : (
            <div>No data available</div>
        );
    };

    return (
        <div className="h-full space-y-6 overflow-scroll">
            <FilterAndSort
                inputValue={inputValue}
                setInputValue={setInputValue}
            />
            {isLoading ? <div>Loading....</div> : returnFormattedData(data)}
        </div>
    );
};

export default FilteredAndSortedItems;
