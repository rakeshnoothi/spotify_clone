import { useState } from "react";

const useFetchOnClick = fetchDataFunction => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = () => {
        setIsLoading(true);
        fetchDataFunction()
            .then(response => {
                setData(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                throw new Error(error.message);
            });
    };

    return {
        data,
        isLoading,
        fetchData,
    };
};
export default useFetchOnClick;
