import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
//utils imports
import localStorageMethod from "./utils/localStorageMethod";

//component imports
import Player from "./components/player/Player";
import Aside from "./components/aside/Aside";
import Fallback from "./components/Fallback";

//context providers.
import UserDataContextProvider from "./context/UserDataContextProvider";

const RenderComponent = ({ element }) => {
    const hasAccessToken = localStorageMethod.getAccessToken();
    return hasAccessToken !== null ? element : null;
};

const App = () => {
    console.log("i rendered from app");

    return (
        <ErrorBoundary
            FallbackComponent={Fallback}
            onReset={() => document.location.reload()}
        >
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
        </ErrorBoundary>
    );
};
export default App;
