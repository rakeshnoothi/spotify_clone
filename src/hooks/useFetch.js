import { useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";

const useFetch = initialFunction => {
    const { showBoundary } = useErrorBoundary();
    const [data, setData] = useState([null]);
    const [isLoading, setIsLoading] = useState(false);

    //takes in array of requests.
    const fetchData = fetchfunctionsArr => {
        setIsLoading(true);
        // fetchFunction()
        //     .then(response => {
        //         console.log("from fetch hook", response);
        //         setData(response.data);
        //         setIsLoading(false);
        //     })
        //     .catch(error => {
        //         console.log("iam from hook error", error);
        //         setIsLoading(false);
        //         showBoundary(error.message);
        //     });
        Promise.all(fetchfunctionsArr.map(fetchFunction => fetchFunction()))
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
            fetchData(initialFunction);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return {
        data,
        isLoading,
        fetchData,
        setData,
    };
};
export default useFetch;
