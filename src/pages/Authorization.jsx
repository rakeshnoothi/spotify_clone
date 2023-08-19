import { requestAuthorization } from "../auth/auth";

const Authorization = () => {
    return (
        <div>
            <button onClick={() => requestAuthorization()}>authorize</button>
        </div>
    );
};
export default Authorization;
