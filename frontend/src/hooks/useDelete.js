import {useState} from "react";
import {useAuth} from "../contexts/authContexts";

export default function useDelete(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {auth} = useAuth();

    const deleteRequest = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${url}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${auth}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();

                setError(errorData);
                throw new Error(errorData);
            }

            const result = await response.json();
            setData(result);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return {data, loading, error, deleteRequest};
}
