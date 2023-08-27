import { useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";

const useFetch = initialFunction => {
    const { showBoundary } = useErrorBoundary();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = fetchFunction => {
        setIsLoading(true);
        fetchFunction()
            .then(response => {
                console.log("from fetch hook", response);
                setData(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log("iam from hook error", error);
                setIsLoading(false);
                showBoundary(error.message);
            });
    };

    useEffect(() => {
        if (initialFunction) {
            fetchData(initialFunction);
        }
    }, []);

    return {
        data,
        isLoading,
        fetchData,
        setData,
    };
};
export default useFetch;
