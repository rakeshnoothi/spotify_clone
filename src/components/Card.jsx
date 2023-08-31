import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const Card = ({ data }) => {
    return (
        <div className="w-full max-w-[300px] h-82 relative p-4 bg-elevated-base lg:max-w-[12rem] hover:bg-elevated-highlight hover:cursor-pointer">
            {/* <div className="absolute z-10 top-0 left-0 w-14 h-14 rounded-full bg-signature"></div> */}
            <button className="absolute  z-50 top-1/3 right-6">
                <PlayArrowIcon
                    className=" text-default bg-signature rounded-full "
                    fontSize="large"
                />
            </button>

            <div className="  flex flex-col items-center space-y-4  ">
                <img
                    src={data.image}
                    alt="Card image"
                    className="aspect-auto w-[166px] "
                />
                <div className="w-full">
                    <div className="font-bold ">{data.name}</div>
                    {data.description !== null ? (
                        <div>{data.description}</div>
                    ) : (
                        <div>{data.ownerName}</div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Card;
