import { Outlet } from "react-router-dom";

import localStorageMethod from "./utils/localStorageMethod";

//component imports
import Player from "./components/player/Player";
import Aside from "./components/aside/Aside";
import UserDataContextProvider from "./context/UserDataContextProvider";

//hook imports.

const RenderComponent = ({ element }) => {
    const hasAccessToken = localStorageMethod.getAccessToken();
    return hasAccessToken !== null ? element : null;
};

const App = () => {
    const loaderEl = document.getElementById("loader");
    loaderEl.classList.add("hide-loader");

    return (
        <div className="h-full text-primary bg-default flex flex-col-reverse lg:flex-row">
            <UserDataContextProvider>
                <RenderComponent element={<Aside />} />
                <div className="h-full px-1 py-2 lg:grow ">
                    <main className="w-full bg-base h-full rounded-lg overflow-y-scroll">
                        <Outlet />
                    </main>
                </div>

                {/* <RenderComponent element={<Player />} /> */}
            </UserDataContextProvider>
        </div>
    );
};
export default App;
