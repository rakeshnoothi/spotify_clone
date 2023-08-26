import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const Card = () => {
    return (
        <div className="w-48 h-64 relative p-4 bg-elevated-base hover:bg-elevated-highlight hover:cursor-pointer">
            {/* <div className="absolute z-10 top-0 left-0 w-14 h-14 rounded-full bg-signature"></div> */}
            <button className="absolute  z-50 top-1/2 right-6">
                <PlayArrowIcon
                    className=" text-default bg-signature rounded-full "
                    fontSize="large"
                />
            </button>

            <div className="  flex flex-col items-center space-y-4  ">
                <img
                    src="https://i.scdn.co/image/ab67656300005f1fa363151f85fb4f90b55d8180"
                    alt="Card image"
                    className="aspect-auto w-[166px] "
                />
                <div className="w-full">
                    <div className="font-bold ">Card Title</div>
                    <div className="">Card Owner</div>
                </div>
            </div>
        </div>
    );
};
export default Card;
