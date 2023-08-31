import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Search = () => {
    return (
        <>
            <div className="h-14 flex justify-center items-center w-full pt-4 sticky top-0">
                <div className=" h-full bg-tinted-base rounded-3xl flex items-center pr-4">
                    <input
                        type="text"
                        placeholder="search a track"
                        className="h-full w-2/5 bg-transparent pl-4 grow outline-none"
                        value={"nothing"}
                    />
                    <SearchOutlinedIcon className="hover:cursor-pointer" />
                </div>
            </div>
            <div className="h-full">cards</div>
        </>
    );
};
export default Search;

// <div className="w-full pt-4 sticky top-0">
// </div>
