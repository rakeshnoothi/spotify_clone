import { useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";

const useFetch = initialFunction => {
    const { showBoundary } = useErrorBoundary();
    const [data, setData] = useState([null]);
    const [isLoading, setIsLoading] = useState(false);

    //takes in array of requests.
    const fetchOnClick = fetchFunctionsArr => {
        const callFunctions = fetchFunctionsArr.map(fetchFunction =>
            fetchFunction()
        );
        setIsLoading(true);
        Promise.all(callFunctions)
            .then(responseArr => {
                const dataArr = responseArr.map(response => response.data);
                setData(dataArr);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error.message);
                setIsLoading(false);
                showBoundary(error.message);
            });
    };

    useEffect(() => {
        if (initialFunction) {
            fetchOnClick(initialFunction);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return {
        data,
        isLoading,
        fetchOnClick,
        setData,
    };
};
export default useFetch;
