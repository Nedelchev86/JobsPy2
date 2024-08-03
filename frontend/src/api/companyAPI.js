import useFetch from "../hooks/useFetch";
import useFetchWithToken from "../hooks/useFetchWithToken";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}company/`;

export function getAllCompanies() {
    return useFetch(`${API_BASE_URL}`, []);
}

export function getCompanyById(id) {
    return useFetch(`${API_BASE_URL}${id}`, {});
}

export function getApplicantsList() {
    return useFetchWithToken(`${API_BASE_URL}applicants/`, []);
}

