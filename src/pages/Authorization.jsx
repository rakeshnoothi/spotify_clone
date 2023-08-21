import { requestAuthorization } from "../auth/auth";
import spotify_logo from "../assets/spotify_logo.png";

const Authorization = () => {
    return (
        <div className="h-full flex flex-col justify-center items-center space-y-6">
            <img src={spotify_logo} alt="spotify logo" className="w-40 h-12" />
            <button
                onClick={() => requestAuthorization()}
                className="uppercase bg-signature p-4 rounded-lg font-bold text-default hover:text-primary"
            >
                authorize
            </button>
        </div>
    );
};
export default Authorization;
