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
            const isFormData = putData instanceof FormData;
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    ...(isFormData
                        ? {} // Do not set 'Content-Type' header for FormData
                        : {"Content-Type": "application/json"}),
                    Authorization: `Bearer ${auth}`,
                },
                body: putData,
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

// import {useState} from "react";
// import {useAuth} from "../contexts/authContexts";

// export default function usePut(url = "") {
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const {auth} = useAuth(); // Ensure auth context is set up correctly

//     const put = async (putData, options = {}) => {
//         setLoading(true);
//         setError(null);

//         try {
//             const response = await fetch(url, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${auth}`,
//                 },
//                 body: JSON.stringify(putData),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 const errorMessage = Object.values(errorData)[0]?.[0] || response.statusText;
//                 setError(errorMessage);
//                 throw new Error(errorMessage);
//             }

//             const result = await response.json();
//             setData(result);
//             return result;
//         } catch (error) {
//             setError(error.message);
//             throw error;
//         } finally {
//             setLoading(false);
//         }
//     };

//     return {data, loading, error, put};
// }
