// import {useEffect, useState} from "react";

// export function useFetch(url, initalData) {
//     const [data, setData] = useState(initalData);
//     const [isFetching, setIsFetching] = useState(true);
//     const [toggleRefetch, setToggleRefetch] = useState(false);
//     console.log("test1");
//     useEffect(() => {
//         console.log("test2");
//         setIsFetching(true);
//         const abortController = new AbortController();

//         (async () => {
//             const response = await fetch(url, {signal: abortController.signal});
//             const result = await response.json();

//             setData(result);
//             setIsFetching(false);
//         })();

//         return () => abortController.abort();
//     }, [url, toggleRefetch]);

//     const refetch = () => {
//         setToggleRefetch((state) => !state);
//     };

//     return {
//         data,
//         isFetching,
//         refetch,
//     };
// }

import {useState, useEffect} from "react";

const useFetch = (url, initialData = null) => {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [toggleRefetch, setToggleRefetch] = useState(false);

    console.log(url);
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
                setData(result); // Update data state with fetched data
                console.log("Data set");
            } catch (err) {
                setError(err.message); // Update error state if fetch fails
                console.error("Fetch error:", err.message);
            } finally {
                setLoading(false); // Set loading to false once fetch is complete
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
