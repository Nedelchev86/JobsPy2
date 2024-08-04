import {useState} from "react";
import {useAuth} from "../contexts/authContexts";

export default function usePost(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {auth} = useAuth();

    const post = async (postData, isFormData = false) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${auth}`,
                    ...(!isFormData && {"Content-Type": "application/json"}),
                },
                body: isFormData ? postData : JSON.stringify(postData),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();
            setData(result);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return {data, loading, error, post};
}
