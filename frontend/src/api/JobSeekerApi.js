import useFetch from "../hooks/useFetch";
import useFetchWithToken from "../hooks/useFetchWithToken";
import usePost from "../hooks/usePost";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}jobseekers/`;

export function getAllJobseekersk() {
    let response = fetch(`${API_BASE_URL}`);
    let result = response.json();

    return result;
}

export function getJobseekerByID(id) {
    return useFetch(`${API_BASE_URL}${id}`, {});
}

export function getApplyedJobs(id) {
    return useFetchWithToken(`${API_BASE_URL}applyed/jobs/`, []);
}

export function getJobseekersEducations(id) {
    return useFetchWithToken(`${API_BASE_URL}educations/${id}`, []);
}

export function getFavoritesJobs() {
    return useFetchWithToken(`${API_BASE_URL}favorites/`, []);
}

export function postEducation(id, data) {
    return usePost(`${API_BASE_URL}educations/create/`, data);
}
