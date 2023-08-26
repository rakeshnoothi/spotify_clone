import CategoryItem from "./CategoryItem";
import FilterAndSort from "./FilterAndSort";

const FilteredAndSortedItems = ({ data, isLoading }) => {
    const returnFormattedData = data => {
        if (data === null) return <div>No data available</div>;

        let itemsDataArr = [];

        if (data.artists?.items.length >= 1) {
            itemsDataArr = data.artists.items.map(item => ({
                image: item.images[0]?.url,
                id: item.id,
                owner: null,
                name: item.name,
            }));
        } else if (data.items && data.items[0]?.album !== undefined) {
            itemsDataArr = data.items.map(item => ({
                image: item.album.images[0]?.url,
                id: item.album.id,
                owner: item.album.artists[0]?.name,
                name: item.album.name,
            }));
        } else if (data.items) {
            itemsDataArr = data.items.map(item => ({
                image: item.images[0]?.url,
                id: item.id,
                owner: item.owner?.display_name,
                name: item.name,
            }));
        }

        return itemsDataArr.length > 0 ? (
            itemsDataArr.map(itemData => (
                <CategoryItem itemData={itemData} key={itemData.id} />
            ))
        ) : (
            <div>No data available</div>
        );
    };

    return (
        <div className="h-full space-y-6 overflow-scroll">
            <FilterAndSort />
            {isLoading ? <div>Loading....</div> : returnFormattedData(data)}
        </div>
    );
};

export default FilteredAndSortedItems;
