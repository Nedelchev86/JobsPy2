import useFetch from "../hooks/useFetch";
import usePut from "../hooks/usePut";
import useFetchWithToken from "../hooks/useFetchWithToken";
import {API_URL} from "../config";

const API_BASE_URL = `${API_URL}company/`;

export function getAllCompanies() {
    return useFetch(`${API_BASE_URL}`, []);
}

export function getCompanyById(id) {
    return useFetch(`${API_BASE_URL}${id}`, {});
}

export function getApplicantsList() {
    return useFetchWithToken(`${API_BASE_URL}applicants/`, []);
}

export function getJobsByCompany() {
    return useFetchWithToken(`${API_BASE_URL}created-jobs/`, []);
}

export function getCompanyForEdit() {
    return useFetchWithToken(`${API_BASE_URL}update/`);
}

export function putCompanyUpdate(data) {
    return usePut(`${API_BASE_URL}update/`);
}
