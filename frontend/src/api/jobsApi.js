import useFetch from "../hooks/useFetch";
import useFetchWithToken from "../hooks/useFetchWithToken";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}jobs/`;


export function getJobDetails(id) {
    return useFetch(`${API_BASE_URL}${id}`, []);
    
}

export function getApplicantsForJob(id) {
    return useFetchWithToken(`${API_BASE_URL}${id}/applicants/`, []);
}
