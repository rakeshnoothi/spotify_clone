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
    return (
        <ErrorBoundary
            FallbackComponent={Fallback}
            onReset={() => document.location.reload()}
        >
            <UserDataContextProvider>
                <div className="h-full bg-default">
                    <div className="h-[90%] text-primary bg-default flex flex-col-reverse lg:flex-row lg:grow">
                        <RenderComponent element={<Aside />} />
                        <div className="h-full px-6 py-2 lg:grow bg-base overflow-auto">
                            <Outlet />
                        </div>
                    </div>
                    <RenderComponent element={<Player />} />
                </div>
            </UserDataContextProvider>
        </ErrorBoundary>
    );
};
export default App;
