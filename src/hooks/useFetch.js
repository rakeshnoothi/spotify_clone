import { useEffect, useState } from "react";

const useFetch = fetchDataFunction => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetchDataFunction()
            .then(response => {
                setData(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });
    }, [fetchDataFunction]);

    return {
        data,
        isLoading,
        error,
    };
};
export default useFetch;
