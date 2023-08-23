import LibraryPanel from "./LibraryPanel";
import NavigationPanel from "./NavigationPanel";

const Aside = () => {
    return (
        <div className="w-full h-1/5 p-2 lg:w-1/3 lg:h-full">
            <div className=" h-full lg:flex lg:flex-col space-y-2">
                <NavigationPanel />
                <LibraryPanel />
            </div>
        </div>
    );
};
export default Aside;
