const Track = () => {
    return (
        <div className="grid grid-cols-3 p-4 hover:bg-elevated-highlight cursor-pointer">
            <div className="flex space-x-4 ">
                <div className="aspect-square w-10">
                    <img
                        src="https://i.scdn.co/image/ab6761610000517478cb99533f34d137d2c05f19"
                        alt="track image"
                    />
                </div>
                <div className="flex flex-col">
                    <span>Title</span>
                    <span className="grow">Creator</span>
                </div>
            </div>
            <span>Emiway</span>
            <span>date</span>
        </div>
    );
};
export default Track;
