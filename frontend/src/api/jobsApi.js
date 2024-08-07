import useDelete from "../hooks/useDelete";
import useFetch from "../hooks/useFetch";
import useFetchWithToken from "../hooks/useFetchWithToken";
import usePost from "../hooks/usePost";
import usePut from "../hooks/usePut";
import {API_URL} from "../config";

const API_BASE_URL = `${API_URL}jobs/`;

export function getJobDetails(id) {
    return useFetch(`${API_BASE_URL}${id}`, []);
}

export function getApplicantsForJob(id) {
    return useFetchWithToken(`${API_BASE_URL}${id}/applicants/`, []);
}

export function postJob() {
    return usePost(`${API_BASE_URL}create/`, {});
}

export function getAllCategories() {
    return useFetch(`${API_BASE_URL}categories/`, []);
}

export function putUpdateJob(id) {
    return usePut(`${API_BASE_URL}update/${id}`, {});
}

export function deleteJob(id) {
    return useDelete(`${API_BASE_URL}${id}/delete/`, {});
}
