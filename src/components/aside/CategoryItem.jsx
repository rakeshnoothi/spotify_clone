import { useNavigate } from "react-router-dom";

const CategoryItem = ({ itemData }) => {
    const navigate = useNavigate();
    return (
        <div
            className="flex space-x-4 p-2 hover:bg-base-highlight hover:cursor-pointer"
            onClick={() => navigate(`/${itemData.type}/${itemData.id}`)}
        >
            <div className="aspect-square w-[48px] ">
                <img
                    src={itemData.image}
                    alt="image here"
                    className="aspect-square w-[48px] "
                />
            </div>
            <div className="grow">
                <div>{itemData.name}</div>
                <div className="text-secondary">{itemData.owner}</div>
            </div>
        </div>
    );
};
export default CategoryItem;
