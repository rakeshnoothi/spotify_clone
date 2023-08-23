const CategoryItem = () => {
    return (
        <div className="flex space-x-4 p-2 hover:bg-base-highlight hover:cursor-pointer">
            <div className="aspect-square w-[48px]">
                <img
                    src="https://mosaic.scdn.co/640/ab67616d00001e02006e0d5d5a2335fc53b29101ab67616d00001e025e2d01bb02ce77c1a0dfed3fab67616d00001e0284351604b643064b97982db5ab67616d00001e02851336dc0408e5446c31c659"
                    alt=""
                />
            </div>
            <div className="grow">
                <div>category name</div>
                <div className="text-secondary">category</div>
            </div>
        </div>
    );
};
export default CategoryItem;
