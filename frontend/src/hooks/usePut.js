// usePut.js
import {useState} from "react";
import {useAuth} from "../contexts/authContexts";

export default function usePut(url = "") {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {auth} = useAuth(); // Assuming auth provides your authentication token

    const put = async (putData, options = {}) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${auth}`,
                    ...options.headers, // Spread additional headers if needed
                },
                body: putData, // This can be FormData or JSON, depending on your use case
                ...options, // Spread any other fetch options if necessary
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();
            setData(result);
            return result; // Return the result for additional processing
        } catch (error) {
            setError(error.message);
            throw error; // Rethrow error to handle it in your component
        } finally {
            setLoading(false);
        }
    };

    return {data, loading, error, put};
}
