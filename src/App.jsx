import { Outlet } from "react-router-dom";

import localStorageMethod from "./utils/localStorageMethod";

//component imports
import Player from "./components/Player";
import Aside from "./components/Aside";
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
        <div className="h-full">
            <UserDataContextProvider>
                <RenderComponent element={<Aside />} />
                <Outlet />
                <RenderComponent element={<Player />} />
            </UserDataContextProvider>
        </div>
    );
};
export default App;
