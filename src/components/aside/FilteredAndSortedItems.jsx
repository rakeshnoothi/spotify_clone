import CategoryItem from "./CategoryItem";
import FilterAndSort from "./FilterAndSort";

const FilteredAndSortedItems = ({ data, isLoading }) => {
    const returnFormattedData = data => {
        if (data === null) return null;

        if (data.artists?.items.length >= 1) {
            return data.artists.items.map(item => {
                return {
                    image: item.images[0].url,
                    id: item.id,
                    owner: null,
                    name: item.name,
                };
            });
        }
        if (data.items[0]?.album !== undefined) {
            return data.items.map(item => {
                return {
                    image: item.album.images[0].url,
                    id: item.album.id,
                    owner: item.album.artists[0].name,
                    name: item.album.name,
                };
            });
        }
        if (data.items) {
            return data.items.map(item => {
                return {
                    image: item.images[0].url,
                    id: item.id,
                    owner: item.owner.display_name,
                    name: item.name,
                };
            });
        }
    };

    const itemsdataArr = returnFormattedData(data);

    console.log("iam from items arr", itemsdataArr);
    return (
        <div className="h-full space-y-6 overflow-scroll">
            <FilterAndSort />
            {!itemsdataArr ? (
                <div>Loading....</div>
            ) : (
                itemsdataArr.map(itemData => (
                    <CategoryItem itemData={itemData} key={itemData.id} />
                ))
            )}
        </div>
    );
};

export default FilteredAndSortedItems;
