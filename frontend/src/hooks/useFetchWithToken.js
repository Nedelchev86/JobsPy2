import {useState, useEffect} from "react";
import {useAuth} from "../contexts/authContexts";

const useFetchWithToken = (url, initialData = null) => {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [toggleRefetch, setToggleRefetch] = useState(false);
    const {auth} = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${auth}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
                console.error("Fetch error:", err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, toggleRefetch]);

    const refetch = () => {
        setToggleRefetch((state) => !state);
    };

    return {data, loading, error, refetch};
};

export default useFetchWithToken;
