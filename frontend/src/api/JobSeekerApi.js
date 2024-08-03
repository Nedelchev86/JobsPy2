import useFetch from "../hooks/useFetch";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}jobseekers/`;

export function getAllJobseekersk() {
    let response = fetch(`${import.meta.env.VITE_API_URL}jobseekers/`);
    let result = response.json();

    return result;
}

export function getJobseekerByID(id) {
    return useFetch(`${API_BASE_URL}${id}`, {});
}
