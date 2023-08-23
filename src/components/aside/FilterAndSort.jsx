import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const FilterAndSort = () => {
    return (
        <div className="flex justify-between ">
            <div className="bg-tinted-base flex space-x-2 p-2 hover:text-primary group">
                <SearchOutlinedIcon className="text-secondary group-hover:text-primary group-hover:cursor-pointer" />
                <input
                    type="text"
                    className="bg-transparent"
                    placeholder="Filter category"
                />
            </div>
            <select name="sort" id="sort" className="bg-base">
                <option value="Recent">Recent</option>
                <option value="Recently-added">Recently Added</option>
                <option value="Alphabetical-order">Alphabetical Order</option>
                <option value="Creator">Creator</option>
            </select>
        </div>
    );
};
export default FilterAndSort;