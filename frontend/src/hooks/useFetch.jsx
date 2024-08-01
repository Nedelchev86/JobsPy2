import {useState, useEffect} from "react";

const useFetch = (url, initialData = null) => {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [toggleRefetch, setToggleRefetch] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(url);
                console.log("Response received");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                setData(result);
                console.log("Data set");
            } catch (err) {
                setError(err.message);
                console.error("Fetch error:", err.message);
            } finally {
                setLoading(false);
                console.log("Fetch complete");
            }
        };

        fetchData();
    }, [url, toggleRefetch]);

    const refetch = () => {
        setToggleRefetch((state) => !state);
    };

    return {data, loading, error, refetch};
};

export default useFetch;
