import Track from "./components/Track";

const TrackList = () => {
    return (
        <div className="h-full space-y-4">
            <div className="h-1/2 flex items-center space-x-10 bg-elevated-base p-4 rounded-xl">
                <div className="aspect-square rounded-full max-w-48 max-h-48 overflow-hidden">
                    <img
                        src="https://i.scdn.co/image/ab6761610000517478cb99533f34d137d2c05f19"
                        alt="type image"
                        // className="w-full overflow-hidden"
                    />
                </div>
                <div className="font-bold text-6xl grow">Emiway Bantai</div>
            </div>
            <div className="h-grow bg-elevated-base rounded-xl">
                <ul className="grid grid-cols-3 p-4 sticky top-0 ">
                    <li>Title</li>
                    <li>Album</li>
                    <li>Date added</li>
                </ul>
                <ul>
                    <li>
                        <Track />
                    </li>
                    <li>
                        <Track />
                    </li>
                    <li>
                        <Track />
                    </li>
                    <li>
                        <Track />
                    </li>
                    <li>
                        <Track />
                    </li>
                    <li>
                        <Track />
                    </li>
                    <li>
                        <Track />
                    </li>
                    <li>
                        <Track />
                    </li>
                    <li>
                        <Track />
                    </li>
                    <li>
                        <Track />
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default TrackList;
