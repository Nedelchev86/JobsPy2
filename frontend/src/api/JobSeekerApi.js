import useFetch from "../hooks/useFetch";
import useFetchWithToken from "../hooks/useFetchWithToken";
import usePost from "../hooks/usePost";
import useDelete from "../hooks/useDelete";
import usePut from "../hooks/usePut";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}jobseekers/`;

export function getAllJobseekersk() {
    return useFetch(`${API_BASE_URL}jobs/`, []);
}

export function getJobseekerForEdit() {
    return useFetchWithToken(`${API_BASE_URL}update/`, {});
}

export function putJobseekerUpdate(data) {
    return usePut(`${API_BASE_URL}update/`);
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

export function getEducationsOfJobseeker(id) {
    return useFetch(`${API_BASE_URL}educations/${id}/`, []);
}

export function deleteEducation(id) {
    return useDelete(`${API_BASE_URL}educations/delete/${id}/`, {});
}
